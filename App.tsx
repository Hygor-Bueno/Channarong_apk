/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//Importação dos ícones e criação de biblioteca.
import React, { useEffect, useState } from 'react';
import { StatusBar} from 'react-native';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faLock, faHome, faUsers,faGears,faGear } from '@fortawesome/free-solid-svg-icons';
library.add(faUserCircle, faLock, faHome, faUsers,faGears,faGear);

import Login from './View/Login';
import { DataBaseLocal } from './Class/DataBaseLocal';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Routers/Router';


export default function App(): JSX.Element {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    (async () => {
      let db = new DataBaseLocal();
      let req = await db.fetchData('data');
      if (req.error) await db.createItem('adm', '1234', 'data', false);
    })();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#393939'}/>
      {
        logged ?
          <Router setLogged={setLogged} /> :
          <Login setLogged={setLogged} />
      }
    </NavigationContainer>
  );
}