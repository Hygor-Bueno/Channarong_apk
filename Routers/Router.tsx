/* eslint-disable prettier/prettier */
import React, { PropsWithChildren } from "react";
import {SafeAreaView,StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../View/Home";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Register from "../View/Register";
import Settings from "../View/Settings";
import Header from "../Components/Construction/Header";

const Tab = createBottomTabNavigator();
interface Props {
    setLogged: (value: boolean) => void
}
export default function Router(props: Props) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={stylesNav}
        >
            <Tab.Screen
                name="Registro"
                children={() => <Skeleton setLogged={props.setLogged} title="Cadastro Channarong"><Register /></Skeleton>}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon="users" size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name="Home"
                children={() =><Skeleton setLogged={props.setLogged} title="Home Channarong"><Home/></Skeleton>}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon="home" size={size} color={color} />)
                }}
            />
            <Tab.Screen
                name="Configurações"
                children={() => <Skeleton setLogged={props.setLogged} title="Configurações Channarong"><Settings /></Skeleton>}
                options={{
                    title: '',
                    headerShown: false,
                    headerTransparent: true,
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon="gears" size={size} color={color} />)
                }}
            />

        </Tab.Navigator>
    );
}
type SkeletonProps = PropsWithChildren<{
    title: string;
    setLogged: (value: boolean) => void;
}>;
function Skeleton(props:SkeletonProps):JSX.Element {
    return(
        <SafeAreaView style={styles.container}>
            <Header setLogged={props.setLogged} title={props.title}/>
            {props.children}
        </SafeAreaView>
    );
}
const stylesNav = {
    tabBarStyle: {
        backgroundColor: '#121212',
        borderTopColor: 'transparent'
    },
    tabBarActiveTintColor: 'white'
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        backgroundColor: '#393939',
      },
})