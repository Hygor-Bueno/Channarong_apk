/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { IModalPupil } from '../../Interfaces/iDataBaseLocal';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ItemForm from '../Forms/ItemForm';


export default function AlterPupil(props: IModalPupil): JSX.Element {
    return (
        <View style={styles.container}>
            <HeaderPupil {...props} />
            <Text>Mensalidade: {props.pupil.status === 2 ? 'Pendente' : 'Ok'} </Text>
            <View>
                <ItemForm value={props.pupil.name} setValue={(e:any) => console.log(e)} placeholder="Digite seu usuários." password={false} label="Nome:" icon="user-circle" />
            </View>
        </View>
    );
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
});
