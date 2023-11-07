/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    FlatList,
} from 'react-native';
import { useChannarongContext } from './ContextChannarong';
import { IModalPupil, IPupil } from '../Interfaces/iDataBaseLocal';
import Util from '../Util/util';
import AlterPupil from '../Components/Pupil/AlterPupil';
import blockData, { filterColorStatus, filterStatus } from '../Components/Pupil/Pupils';

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
            <Section title="Alunos inadimplente:">
                <RenderListPupil list={listPupil.filter(item => item.status === 2)} />
            </Section>
        </View>
    );
}
function RenderListPupil(props: { list: IPupil[] }): JSX.Element {
    const [alterPupil, setAlterPupil] = useState<IPupil>({ id: 0, name: '', free: false, status: 0, payment_date: '' });
    const [modalVisible, setModalVisible] = useState(false);
    let configModal: IModalPupil = { onClose: () => setModalVisible(false), pupil: alterPupil, viewHeader: false };
    return (
        <View style={{display:'flex',height:'90%'}}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AlterPupil {...configModal} />
            </Modal>
            {
                props.list.length > 0 ?
                    <FlatList
                        data={props.list}
                        renderItem={renderItems}
                        keyExtractor={(item) => `pupil_id_${item.id}`}
                    />
                    :
                    <Text style={styles.textPayment}>- Todas as mensalidades estão em dia.</Text>
            }
        </View>
    );
    function renderItems({ item }: { item: IPupil }): JSX.Element {
        return (
            <TouchableOpacity
                onPress={() => {
                    setAlterPupil(item);
                    setModalVisible(true);
                }}
                style={styles.itemRendered}
                key={`pupil_id_${item.id}`}
            >
                {blockData('Nº:', item.id, 10)}
                {blockData('Nome:', item.name, 45)}
                {blockData('Validade:', util.datePtBR(item.payment_date), 30)}
                {blockData('Status:', filterStatus(item.status), 15, true, filterColorStatus(item.status))}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    divView: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height:'86%',
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
        height:'10%'
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
    },
    textPayment: {
        fontWeight: 'bold',
        color: '#444',
        fontSize: RFPercentage(2),
    },
    itemRendered: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: RFPercentage(0.1),
        marginVertical: RFPercentage(0.5),
        padding: RFPercentage(1),
        borderColor: '#aaa',
        borderRadius: RFPercentage(1),
    },
})