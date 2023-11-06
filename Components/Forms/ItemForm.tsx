/* eslint-disable prettier/prettier */

import React from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";

import {
    Text,
    SafeAreaView,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    label: string,
    icon: IconProp,
    password: boolean,
    value?:any,
    setValue:(value: any) => void ,
    placeholder: string,
    isNumeric?: boolean,
}

export default function ItemForm(props: Props): JSX.Element {
    return (
        <SafeAreaView style={{ padding: RFPercentage(1) }}>
            <View style={styles.headerItem}>
                <FontAwesomeIcon color={'#393939'} size={RFPercentage(3.8)} icon={props.icon} />
                <Text style={styles.text}>{props.label}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                secureTextEntry={props.password}
                value={props.value}
                onChangeText={props.setValue}
                keyboardType={props.isNumeric ? "numeric":"default"}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical:RFPercentage(1.2)
    },
    text: {
        fontSize: RFPercentage(3.8),
        marginLeft: RFPercentage(1),
        color:'black'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: RFPercentage(1.2),
        borderWidth: RFPercentage(0.2),
        borderColor: '#ccc',
        fontSize:RFPercentage(2.8),
        color:'#444'
    }
});
