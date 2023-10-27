/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RFPercentage } from 'react-native-responsive-fontsize';

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ItemForm from '../Components/Forms/ItemForm';
import Buttons from '../Components/Buttons/Buttons';
import User from '../Class/User';
import { DataBaseLocal } from '../Class/DataBaseLocal';
import ModalMessage from '../Components/Construction/Modal';


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
interface Props {
  setLogged: (value: boolean) => void
}
export default function Login(props: Props): JSX.Element {
  const user = new User('', '');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.divView}>
          <Section title="Login Channarong App">
            <ItemForm setValue={(e) => user.setName(e)} placeholder="Digite seu usuários." password={false} label="Login:" icon="user-circle" />
            <ItemForm setValue={(e) => user.setPassword(e)} placeholder="Digite sua senha." password={true} label="Senha:" icon="lock" />
            <Buttons
              typeButton="success"
              title={'Login'}
              color="white"
              icon={null}
              size={RFPercentage(3.6)}
              actionButton={async () => {
                try {
                  let newUser = await getUser(user);
                  if (newUser.error) throw new Error(newUser.message);
                  props.setLogged(true);
                } catch (error: any) {
                  let messageErr = error.toString();
                  ModalMessage({
                    title: 'Erro!',
                    message: messageErr.includes('Error: ') ? messageErr.split('Error: ')[1] : messageErr,
                  });
                }
              }} />
          </Section>
      </View>
    </SafeAreaView>
  );
}

async function getUser(user: User): Promise<{ error: boolean; data: []; message: string; }> {
  let result: { error: boolean, data: [], message: string } = { error: false, data: [], message: '' };
  try {
    let db = new DataBaseLocal();
    let list = await db.fetchData('user');
    let filtered: any = list.data.filter(item => item.user.toLocaleUpperCase() === user.getName().toLocaleUpperCase() && item.password === user.getPassword());
    if (filtered.length === 0) { throw new Error('Usuário ou senha incorretos'); }
    result.data = filtered;
  } catch (error: any) {
    let messageErr = error.toString();
    result.error = true;
    result.message = messageErr.includes('Error: ') ? messageErr.split('Error: ')[1] : messageErr;
  }
  return result;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#393939',
    padding: '1%',
  },
  divView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  sectionContainer: {
    display: 'flex',
    flexGrow: 0.7,
    width: '80%',
    flexDirection: 'column',
    backgroundColor: '#f1f2f5',
    borderRadius: RFPercentage(1.2),
    paddingHorizontal: RFPercentage(2),
  },
  sectionTitle: {
    fontSize: RFPercentage(2.8),
  },
});
