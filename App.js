import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";

import { Container, Content, Icon, Header, Body, Left, Right } from 'native-base'
import { createAppContainer, createDrawerNavigator, DrawerItems, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import SettingsScreen from './src/Screens/SettingsScreen';
import HomeScreen from "./src/Screens/HomeScreen";

const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
        <Image
          style={styles.drawerImage}
          source={require('./assets/DrawerIcons/icon.png')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

const Drawer = createDrawerNavigator({

    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen
    }
},
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)

const switchNavigator = createSwitchNavigator({
    Drawer
});


export default createAppContainer(switchNavigator);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerHeader: {
    height: 130,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 100,
    width: 100,
    borderRadius: 75,
    justifyContent: 'center',
    alignSelf: 'center'
  }

})