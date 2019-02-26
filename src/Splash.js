import React from "react";
import { ImageBackground, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { connect } from 'react-redux';
import { getToken } from './public/redux/actions/auth'
import { getUser } from './public/redux/actions/user'

class Splash extends React.Component {

    constructor(props) {
        super(props);
        
      }

      _bootstrapAsync = async () => {
            await this.props.dispatch(getToken())
            if(this.props.auth.token == null) {
                this.props.navigation.navigate('LoginNavigator')
            } else {
                await this.props.dispatch(getUser(this.props.auth))
                this.props.navigation.navigate('Home')
            }
      };

      componentDidMount() {
        setTimeout(() => {
            this._bootstrapAsync();
        }, 3000);
       }

    render(){
        return(
            <View style={styles.container}>
              <ImageBackground source={{uri: "https://webgradients.com/public/webgradients_png/082%20Desert%20Hump.png"}} style={{width: '100%', height: '100%'}}>
              <View behavior="padding" style={styles.container}>
                    <View style={styles.titleContainer}>
                        <ActivityIndicator size='large' color='#03A9F4'/>
                        <Text style={styles.headtext}>E-Notes</Text>
                    </View>
                </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Splash);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headtext: {
        color: "#fff",
        width: 160,
        textAlign: "center",
        fontSize: 28,
        fontFamily: 'SharpeBl_PERSONAL'
    }
});