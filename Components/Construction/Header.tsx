/* eslint-disable prettier/prettier */
import { RFPercentage } from 'react-native-responsive-fontsize';

import React from 'react';
import type { PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';

type HeaderProps = PropsWithChildren<{
    title: string;
    setLogged: (value: boolean) => void;
}>;

export default function Header(props: HeaderProps): JSX.Element {
    return (
        <View style={styles.HeaderContainer}>
            <View style={styles.viewTitle}>
                <Text style={styles.HeaderTitle}>{props.title}</Text>
            </View>
            <View style={styles.viewImg}>
                <TouchableOpacity onPress={()=>Modal({title:'Atenção!',message:'Deseja mesmo sair?',onConfirm:()=>props.setLogged(false)})} style={styles.logoTouch}>
                    <Image style={styles.LogoImg} source={require('../../Assets/Image/Logo.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    HeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexGrow: 0.05,
        backgroundColor: '#121212',
        width: '100%',
        paddingHorizontal: RFPercentage(2),
    },
    viewTitle:{
        width: '88%'
    },
    viewImg:{
        display:'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '12%',
    },
    HeaderTitle: {
        fontSize: RFPercentage(4),
        color: 'white'
    },
    logoTouch: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: RFPercentage(10),
        width: RFPercentage(10),
        borderRadius: RFPercentage(5)
    },
    LogoImg: {
        height: RFPercentage(10),
        width: RFPercentage(10)
    },
});
