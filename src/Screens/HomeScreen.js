import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert
} from "react-native";

import { Button, Container, Header, Content, Left, Footer, Fab, Icon } from 'native-base';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomHeader from '../Components/CustomHeader'

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Home",
    headerLeft: <Icon name="menu" onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/DrawerIcons/home.png')}
        style={styles.icon}
      />
    ),
  })

  render() {

    return (

      <Container>

        <CustomHeader title="E-Notes" drawerOpen={() => this.props.navigation.openDrawer()} />

        <Content>
            
        </Content>
          <View style={{flex:1}}>
              <ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Note" onPress={() => console.log("notes tapped!")}>
                <Ionicons name="ios-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Audio" onPress={() => {}}>
                <Ionicons name="ios-microphone" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="Image" onPress={() => {}}>
                <Ionicons name="ios-image" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              </ActionButton>
          </View>
      </Container>

    )
  }

}

export default HomeScreen;


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  actionButtonIcon: {
    fontSize: 23,
    height: 25,
    color: 'white',
  },
});