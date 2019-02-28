import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { Container, Content } from 'native-base'
import { createAppContainer, createDrawerNavigator, DrawerItems, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './src/public/redux/store';
import { Provider } from 'react-redux';

import LogOutScreen from './src/Screens/LogOutScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import Splash from './src/Splash'
import DrawerProfile from './src/DrawerProfile';
import NewNote from './src/Screens/NewNote';

const CustomDrawerContentComponent = (props) => (

  <Container> 
    <DrawerProfile />
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

const LoginNavigator = createStackNavigator({
  Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
          header: null
      })
  },
  Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
          title: "Register",
          headerStyle: {
              backgroundColor: '#fff',
          },
          headerTintColor: '#000'
      }),
  }
})

const CreateNoteNavigator = createStackNavigator({
  NewNote: {
      screen: NewNote,
      navigationOptions: () => ({
        header: null
    })
  },
})

const Drawer = createDrawerNavigator({

    HomeDrawer: {
      screen: HomeScreen,
    },
    SettingsDrawer: {
      screen: SettingsScreen
    },
    LogOut : {
      screen: LogOutScreen,
      navigationOptions: () => ({
        header: null
      })
    }
},
  {
    initialRouteName: 'HomeDrawer',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

const MainStack = createAppContainer(createSwitchNavigator(
  {
      Splash : Splash,
      Drawer : Drawer,
      Login : LoginNavigator,
      NewNote : CreateNoteNavigator
  },
  {
      initialRouteName: 'Splash'
  }
));


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}