import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Container, Content, ListItem, Body, Text, Button, Left, Right, Icon } from 'native-base'
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
      Login : LoginNavigator
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

const styles = StyleSheet.create({
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
})