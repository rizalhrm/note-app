import React, { Component } from "react";

import { Container, Content } from 'native-base'
import { createAppContainer, createDrawerNavigator, DrawerItems, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './src/public/redux/store';
import { Provider } from 'react-redux';

import TagsScreen from './src/Screens/TagsScreen';
import HomeScreen from "./src/Screens/HomeScreen";
import Splash from './src/Splash'
import DrawerProfile from './src/DrawerProfile';
import NewNote from './src/Screens/NewNote';
import UpdateNote from './src/Screens/UpdateNote';
import ViewNote from './src/Screens/ViewNote';

const CustomDrawerContentComponent = (props) => (

  <Container> 
    <DrawerProfile />
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

const CreateNoteNavigator = createStackNavigator({
  NewNote: {
      screen: NewNote,
      navigationOptions: () => ({
        header: null
    })
  },
  ViewNote: {
    screen: ViewNote,
    navigationOptions: () => ({
      header: null
  })
  },
  UpdateNote: {
    screen: UpdateNote,
    navigationOptions: () => ({
      header: null
  })
  },
})

const Drawer = createDrawerNavigator({

    HomeDrawer: {
      screen: HomeScreen,
    },
    TagsDrawer: {
      screen: TagsScreen
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