/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//Importação dos ícones e criação de biblioteca.
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faLock, faHome, faUsers, faGears, faGear, faCircleCheck,faCircleExclamation,faCircleXmark,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
library.add(faUserCircle, faLock, faHome, faUsers, faGears, faGear, faCircleCheck,faCircleExclamation,faCircleXmark,faArrowRightFromBracket);

import Login from './View/Login';
import { DataBaseLocal } from './Class/DataBaseLocal';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Routers/Router';
import ChannarongProvider from './View/ContextChannarong';

export default function App(): JSX.Element {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    (async () => {
      let db = new DataBaseLocal();
      let reqUser = await db.fetchData('user');
      if (reqUser.error) {
        await db.createUser('adm', '1234', 'user', true, true);
      }
    })();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#393939'} />
      {
        logged ?
          <ChannarongProvider>
            <Router setLogged={setLogged} />
          </ChannarongProvider>
          :
          <Login setLogged={setLogged} />
      }
    </NavigationContainer>
  );
}