/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { RFPercentage } from "react-native-responsive-fontsize";

interface Props {
    typeButton: string;
    actionButton: () => void;
    color: string;
    size: number;
    icon: string | null ;
    title: string | null ,
}
export default function Buttons(props: Props): JSX.Element {
    return (
        <TouchableOpacity style={{ ...styles[props.typeButton], ...styles.btnStyle }} onPress={() => props.actionButton()}>
            {
                props.icon
                    ?
                    <FontAwesomeIcon color={props.color} icon={props.icon} size={props.size} />
                    :
                    <Text style={{fontSize: props.size,color: props.color}}>{props.title}</Text>
            }

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    danger: {
        backgroundColor: '#dc3545',
    },
    success: {
        backgroundColor: '#198754',
    },
    btnStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: RFPercentage(1.2),
        borderRadius: RFPercentage(1.2),
        marginBottom: RFPercentage(1.2),
        marginTop: RFPercentage(1.2),
    }
});