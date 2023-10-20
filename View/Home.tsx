/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RFPercentage } from "react-native-responsive-fontsize";

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

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

export default function Home(): JSX.Element {
    return (
        <View style={styles.divView}>
            <Section title="Home Channarong">
                <Text>Hellow Home</Text>
            </Section>
        </View>
    );
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
        height:'100%',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#f1f2f5',
        paddingHorizontal: RFPercentage(2),
    },
    sectionTitle: {
        fontSize: RFPercentage(2.8),
    }
});
