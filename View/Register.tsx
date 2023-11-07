/* eslint-disable prettier/prettier */
import { RFPercentage } from 'react-native-responsive-fontsize';

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';
import { useChannarongContext } from './ContextChannarong';
import { IModalPupil, IPupil } from '../Interfaces/iDataBaseLocal';
import AlterPupil from '../Components/Pupil/AlterPupil';
import Util from '../Util/util';
import blockData, { filterColorStatus, filterStatus } from '../Components/Pupil/Pupils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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

export default function Register(): JSX.Element {
    const { listPupil } = useChannarongContext();
    const [list, setList] = useState<IPupil[]>([]);
    const originPupil: IPupil = { id: 0, name: '', free: false, status: 0, payment_date: '' };
    const [modalVisible, setModalVisible] = useState(false);
    const [configModal, setConfigModal] = useState<IModalPupil>({ onClose: () => setModalVisible(false), pupil: originPupil, viewHeader: false, addItem: false });
    const util = new Util();

    useEffect(() => {
        (() => {
            setList(listPupil.sort(ordernateForName));
        })();

        function ordernateForName(a: IPupil, b: IPupil): number {
            let result: number = 0;
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
                result = -1;
            } else if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
            }
            return result;
        }
    }, [listPupil]);

    // useEffect(() => {
    //     console.log(list);
    // }, [list]);

    return (
        <View style={styles.divView}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}
            >
                <AlterPupil {...configModal} />
            </Modal>
            <Section title="Cadastro de alunos:">
                <View>
                    <TouchableOpacity style={styles.buttonAddPupil} onPress={() => {
                        setModalVisible(true);
                        configModal.addItem = true;
                        configModal.pupil = originPupil;
                        setConfigModal({ ...configModal });
                    }}>
                        <FontAwesomeIcon color='#121212' icon={'user-plus'} size={RFPercentage(5)} />
                    </TouchableOpacity>
                </View>
                {list.length > 0 ?
                    <FlatList
                        data={list}
                        renderItem={renderItems}
                        keyExtractor={(item) => `pupil_id_${item.id}`}
                    />
                    :
                    <Text style={styles.textOptional}> - Nenhum aluno cadastrado!</Text>}
            </Section>
        </View>
    );

    function renderItems({ item }: { item: IPupil }): JSX.Element {
        return (
            <TouchableOpacity
                onPress={() => {
                    configModal.addItem = false;
                    configModal.pupil = item;
                    setConfigModal({ ...configModal });
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
        backgroundColor: '#f1f2f5',
        height: '86%',
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
    itemRendered: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: RFPercentage(0.1),
        marginVertical: RFPercentage(0.5),
        padding: RFPercentage(1),
        borderColor: '#aaa',
        borderRadius: RFPercentage(1),
    },
    textOptional: {
        color: '#444',
        fontSize: RFPercentage(2.2),
    },
    buttonAddPupil: {
        marginVertical: RFPercentage(1),
        padding: RFPercentage(1),
        width: RFPercentage(7),
        height: RFPercentage(7),
        borderRadius: RFPercentage(3.5),
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
