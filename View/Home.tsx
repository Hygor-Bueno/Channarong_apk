/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RFPercentage } from "react-native-responsive-fontsize";

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal
} from 'react-native';
import { useChannarongContext } from "./ContextChannarong";
import { IModalPupil, IPupil } from "../Interfaces/iDataBaseLocal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Util from "../Util/util";
import AlterPupil from "../Components/Pupil/AlterPupil";

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section(props: SectionProps): JSX.Element {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{props.title}</Text>
            {props.children}
        </View>
    );
}

const util = new Util();
export default function Home(): JSX.Element {
    const { listPupil } = useChannarongContext();
    return (
        <View style={styles.divView}>
            <Section title="Lista de Alunos:">
                <RenderListPupil list={listPupil} />
            </Section>
        </View>
    );
}
export function RenderListPupil(props: { list: IPupil[] }): JSX.Element {
    const [alterPupil,setAlterPupil]= useState<IPupil>({id:0,name:'',free:false,status:0,payment_date:''});
    const [modalVisible, setModalVisible] = useState(false);
    let configModal:IModalPupil = {onClose:()=>setModalVisible(false),pupil:alterPupil,viewHeader:false};
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AlterPupil {...configModal}/>
            </Modal>
            {props.list.map((item: IPupil) => (
                <TouchableOpacity onPress={() => {setAlterPupil(item),setModalVisible(true)}} style={{ display: "flex", flexDirection: 'row', borderWidth: RFPercentage(0.1), marginVertical: RFPercentage(0.5), padding: RFPercentage(1), borderColor: '#aaa', borderRadius: RFPercentage(1) }} key={`pupil_id_${item.id}`}>
                    {blockData("Nº:", item.id, 10)}
                    {blockData("Nome:", item.name, 45)}
                    {blockData("Validade:", util.datePtBR(item.payment_date), 30)}
                    {blockData("Status:", filterStatus(item.status), 15, true, filterColorStatus(item.status))}
                </TouchableOpacity >
            ))}
        </View>
    );
    function blockData(label: string, value: any, widthPercent: number, icon?: boolean, colorIcon?: string): JSX.Element {
        let styleBlock = StyleSheet.create({
            container: {
                width: `${widthPercent}%`,
                // backgroundColor: 'red'
            }
        });
        return (
            <View style={styleBlock.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={icon && { display: 'flex', alignItems: 'center' }}>
                    {icon ? <FontAwesomeIcon color={colorIcon ? colorIcon : 'black'} icon={value} /> : <Text>{value}</Text>}
                </View>
            </View>
        );
    }
    function filterStatus(staus: number): string {
        //faCircleCheck,faCircleExclamation,circle-xmark
        let result: string = '';
        switch (staus) {
            case 0:
                result = 'circle-xmark';
                break;
            case 1:
                result = 'circle-check';
                break;
            case 2:
                result = 'circle-exclamation';
                break;
            default:
                break;
        }
        return result;
    }
    function filterColorStatus(staus: number): string {
        //faCircleCheck,faCircleExclamation,circle-xmark
        let result: string = '';
        switch (staus) {
            case 0:
                result = 'red';
                break;
            case 1:
                result = 'green';
                break;
            case 2:
                result = 'orange';
                break;
            default:
                break;
        }
        return result;
    }
}

const styles = StyleSheet.create({
    divView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    sectionContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#f1f2f5',
        paddingHorizontal: RFPercentage(2),
    },
    sectionTitle: {
        fontSize: RFPercentage(2.8),
    },
    label: {
        fontWeight: 'bold',
        color: '#444'
    }
});
