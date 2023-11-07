/* eslint-disable prettier/prettier */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export function filterStatus(staus: number): string {
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
export function filterColorStatus(staus: number): string {
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

export default function blockData(label: string, value: any, widthPercent: number, icon?: boolean, colorIcon?: string): JSX.Element {
    let styleBlock = StyleSheet.create({
        container: {
            width: `${widthPercent}%`,
        },
        blockView: { display: 'flex', alignItems: 'center' },
        label: {
            fontWeight: 'bold',
            color: '#444',
        },
    });
    return (
        <View style={styleBlock.container}>
            <Text style={styleBlock.label}>{label}</Text>
            <View style={icon && styleBlock.blockView}>
                {icon ? <FontAwesomeIcon color={colorIcon ? colorIcon : 'black'} icon={value} /> : <Text>{value}</Text>}
            </View>
        </View>
    );
}

