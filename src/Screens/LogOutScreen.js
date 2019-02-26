import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import {connect} from 'react-redux';
import { Container, Content, Icon, Button } from 'native-base';

import { logout } from '../public/redux/actions/auth';

class LogOutScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          isAuth: false
        };
      }

    static navigationOptions = ({ navigation }) => ({
        title: "Logout",
        headerLeft: <Icon name="menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerIcon:
            <Image
                source={require('../../assets/DrawerIcons/out.png')}
                style={[styles.icon]}
            />

    })
    
    componentDidMount() {
        this.props.navigation.navigate("Login")
    }

    render() {
        return (<ActivityIndicator size='large' color='#03A9F4'/>
        )
    }

}

const mapStateToProps = (state) => {
	return {
        auth: state.auth,
        user: state.user
	}
}

export default connect(mapStateToProps)(LogOutScreen)

const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    }
})