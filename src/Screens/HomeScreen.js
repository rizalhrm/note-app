import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Card, Body, CardItem } from 'native-base';
import { connect } from 'react-redux';
import { allNote } from '../public/redux/actions/note';

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

  componentDidMount() {
      this.getData();
  }

  getData = async () => {
      await this.props.dispatch(allNote());
  }

  _keyExtractor = (item, index) => item.id.toString();

    renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={()=> this.handleNavigateDetail(item.id)}>

        <Card style={{marginRight: 4, marginLeft:4 , marginBottom: 4 , width: 200, height: 200}}>
          <CardItem>
            <Body>
              <Text numberOfLines={1} style={{color: 'grey', fontSize: 15, paddingBottom: 5}}>{item.created_at}</Text>
              <Text numberOfLines={2} style={{ fontSize: 18, color : 'black', marginBottom:2}}>{item.title == null ? '[No Title]' : item.title }</Text>
              <Text numberOfLines={3} style={{ fontSize: 16, color : 'black', marginBottom:2}}>{item.detail_notes_id == null ? '' : item.detail_notes_id.text }</Text>
            </Body>
            <Image source={{uri: item.image}} style={styles.image}/>
          </CardItem>
        </Card>

        </TouchableWithoutFeedback>
    )

  render() {
    let totalItem = this.props.note.notes.length;
    return (

      <Container>

        <CustomHeader title="E-Notes" drawerOpen={() => this.props.navigation.openDrawer()} />

        <Content style={{backgroundColor: '#f3f3f3'}}>
          {totalItem > 0 ? (
              <FlatList
              data={this.props.note.notes}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
              refreshing={this.props.note.isLoading}
              horizontal={false}
              numColumns={2}
              />
            ) :
            (
              <View style={styles.wrapper}>
                <View style={styles.iconRow}>
                    <Ionicons name="ios-book" style={{color: '#000', height: 50, fontSize: 50}} />
                </View>
                <View style={styles.titleRow}>
                    <Text style={styles.titleText}>You have no notes...yet...</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.messageText}>There are no notes saved. Create your first one by tapping on the following button!</Text>
                </View>
            </View>
            )
          }

        </Content>
        <Button onPress={() => this.props.navigation.navigate('NewNote')}><Text>wasas</Text></Button>
            <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' title="New Note" onPress={() => this.props.navigation.navigate('NewNote')}>
              <Ionicons name="ios-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Audio" onPress={() => {}}>
              <Ionicons name="ios-microphone" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Image" onPress={() => {}}>
              <Ionicons name="ios-image" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            </ActionButton>
      </Container>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps)(HomeScreen);


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
  wrapper: {
    marginTop : 35,
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10
  },
  iconRow: {
      marginBottom: 10,
      alignItems: 'center'
  },
  titleRow: {
      marginBottom: 40
  },
  titleText: {
      backgroundColor: 'transparent',
      fontFamily: 'Roboto-Bold',
      fontSize: 24,
      color: '#000',
      textAlign: 'center'
  },
  messageRow: {
      marginBottom: 20
  },
  messageText: {
      backgroundColor: 'transparent',
      fontFamily: 'Roboto-Regular',
      fontSize: 18,
      color: '#000',
      textAlign: 'center'
  },
  buttonText: {
      textAlign: 'center',
      backgroundColor: 'transparent',
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
      color: '#000'
  }
});