/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { IModalPupil } from '../../Interfaces/iDataBaseLocal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ItemForm from '../Forms/ItemForm';
import { IPupil } from '../../Interfaces/iDataBaseLocal';
import { DataBaseLocal } from '../../Class/DataBaseLocal';
import Util from '../../Util/util';
import { useChannarongContext } from '../../View/ContextChannarong';


export default function AlterPupil(props: IModalPupil): JSX.Element {
    const [free, setFree] = useState(props.pupil.free || false);
    const [name, setName] = useState(props.pupil.name || '');
    const [day, setDay] = useState(new Date(props.pupil.payment_date || new Date()).getDate().toString().padStart(2, '0'));
    const [month, setMonth] = useState((new Date(props.pupil.payment_date || new Date()).getMonth() + 1).toString().padStart(2, '0'));
    const [year, setYear] = useState(new Date(props.pupil.payment_date || new Date()).getFullYear().toString().padStart(2, '0'));
    const [status, setStatus] = useState(props.pupil.status || 0);
    const { setListPupil } = useChannarongContext();

    return (
        <View style={styles.container}>
            <HeaderPupil {...props} />
            <Text>Mensalidade: {status === 2 ? 'Pendente' : 'Ok'} </Text>
            <View>
                <ItemForm value={name} setValue={(e: any) => setName(e)} placeholder="Digite seu usuários." password={false} label="Nome:" icon="user-circle" />
            </View>
            <Text style={styles.notifyPayment}>Vencimento da ultima mensalidade:</Text>

            <View style={styles.viewDate}>
                <View>
                    <ItemForm isNumeric={true} value={day} setValue={(e: any) => { limitedNUmber(parseInt(e) || 0, 0, 31) && setDay(e); }} placeholder="dia" password={false} label="Dia:" icon="calendar-day" />
                </View>
                <View>
                    <ItemForm isNumeric={true} value={month} setValue={(e: any) => limitedNUmber(parseInt(e) || 0, 0, 12) && setMonth(e)} placeholder="Mês" password={false} label="Mês:" icon="calendar-day" />
                </View>
                <View>
                    <ItemForm isNumeric={true} value={year} setValue={(e: any) => setYear(e)} placeholder="Ano" password={false} label="Ano:" icon="calendar-day" />
                </View>
            </View>

            <View style={{ padding: RFPercentage(1) }}>
                <TouchableOpacity style={{ marginVertical: RFPercentage(1.2) }} onPress={() => { setFree(!free); }}>
                    <Text style={{ fontSize: RFPercentage(3.8), color: '#444' }}>Bolsista: </Text>
                    <FontAwesomeIcon size={RFPercentage(3.2)} color={free ? '#218838' : '#dc3545'} icon={free ? 'check-circle' : 'circle-xmark'} />
                </TouchableOpacity>
            </View>

            <View style={{ padding: RFPercentage(1) }}>
                <Text style={{ fontSize: RFPercentage(3.8), color: '#444' }}>Status: </Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableOpacity style={styles.touchStatus} onPress={() => setStatus(0)}>
                        <FontAwesomeIcon color={status === 0 ? '#218838' : '#777'} icon={status === 0 ? 'square-check' : 'square'} />
                        <Text style={styles.textStatus}>Inativo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchStatus} onPress={() => setStatus(2)}>
                        <FontAwesomeIcon color={status === 2 ? '#218838' : '#777'} icon={status === 2 ? 'square-check' : 'square'} />
                        <Text style={styles.textStatus}>Pendente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchStatus} onPress={() => setStatus(1)}>
                        <FontAwesomeIcon color={status === 1 ? '#218838' : '#777'} icon={status === 1 ? 'square-check' : 'square'} />
                        <Text style={styles.textStatus}>Ativo</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: RFPercentage(1), marginVertical: RFPercentage(4) }}>
                <TouchableOpacity style={{ ...styles.buttonsFooter, backgroundColor: '#218838' }} onPress={async () =>bntUpdate()}>
                    <FontAwesomeIcon size={RFPercentage(4)} color={'white'} icon={'floppy-disk'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.buttonsFooter, backgroundColor: '#BF930D' }} onPress={async () => { paymentButton()}}>
                    <FontAwesomeIcon size={RFPercentage(4)} color={'white'} icon={'sack-dollar'} />
                </TouchableOpacity>
            </View>
        </View>
    );
    async function bntUpdate(){
        let changePupil: IPupil = {
            id: props.pupil.id,
            name: name,
            payment_date: `${year}-${month}-${day}`,
            free: free,
            status: validateStatus(status,`${year}-${month}-${day}`),
        };
        updatePupil(changePupil);
    }
    async function paymentButton(){
        let util = new Util();
        let newPayment = new Date(`${year}-${month}-${day}`);
        newPayment.setMonth(newPayment.getMonth() + 1);
        let changePupil: IPupil = {
            id: props.pupil.id,
            name: name,
            payment_date: util.dbDate(newPayment),
            free: free,
            status: validateStatus(status,util.dbDate(newPayment)),
        };
        updatePupil(changePupil);
    }
    async function updatePupil(object: IPupil) {
        try {
            let dbLocal = new DataBaseLocal();
            await dbLocal.updatePupil(object, 'pupil');
            let reqUser = await dbLocal.fetchData('pupil');
            if (reqUser.error) { throw new Error(reqUser.message); }
            setListPupil([...reqUser.data]);
            props.onClose();
        } catch (error) {
            console.log(error);
        }
    }
    function limitedNUmber(value: number, min: number, max: number): boolean {
        let response = true;
        if (value > max || value < min) {
            response = false;
        }
        return response;
    }
    function validateStatus(statusCode: number,payment_date: string): number {
        let result: number = statusCode;
        if (result !== 0) {
            const util = new Util();
            result = util.dbDate() <= payment_date ?  1 :  2;
        }
        return result;
    }
}
function HeaderPupil(props: IModalPupil): JSX.Element {
    return (
        <View style={styles.header}>
            <Text style={styles.titles}>
                Nº {props.pupil.id} - {props.pupil.name.slice(0, 20)}.
            </Text>
            <TouchableOpacity onPress={() => props.onClose()}>
                <FontAwesomeIcon color="#444444" size={RFPercentage(3.2)} icon="arrow-right-from-bracket" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: RFPercentage(1),
    },
    header: {
        // backgroundColor:'red'
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: RFPercentage(1.2),
    },
    titles: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: RFPercentage(3.2),
    },
    viewDate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonsFooter: {
        padding: RFPercentage(1.4),
        borderRadius: RFPercentage(1.4),
        marginHorizontal: RFPercentage(2),
    },
    touchStatus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStatus: {
        fontSize: RFPercentage(2.8),
        marginHorizontal: RFPercentage(1),
    },
    notifyPayment: {
        fontWeight: 'bold',
        color: '#888',
        fontSize: RFPercentage(2),
        padding: RFPercentage(1),
    },
});
