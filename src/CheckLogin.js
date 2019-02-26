import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Container, Content, Header, Body } from 'native-base'
import { connect } from 'react-redux'

import { getToken, removeToken } from './public/redux/actions/auth'
import { getUser } from './public/redux/actions/user'

class CheckLogin extends React.Component {

    // componentDidMount() {
	// 	this._startup()
	// }

	// _startup = async () => {
	// 	try {
	// 		await this.props.dispatch(getToken())
	// 		await this.props.dispatch(getUser(this.props.auth))
	// 	} catch(e) {
	// 		alert(e.message)
	// 	}
	// }

    render(){
        
        return (
            <Header style={styles.drawerHeader}>
                <Body>
                    <Image
                    style={styles.drawerImage}
                    source={require('../assets/DrawerIcons/icon.png')} />
                    <View style={{flexDirection:'column', justifyContent:'center', paddingHorizontal:10}}>
								<Text style={{color: '#fff'}}>username</Text>
								<TouchableOpacity
                                    onPress={ async () => {
                                            try{
                                                await this.props.dispatch(removeToken())
                                                this.props.navigation.navigate('Login')
                                            } catch(e){
                                                console.log(e)
                                            }
                                        }
                                    }
                                >
                                    <Text style={{color:'#fff', fontFamily:'Roboto-Regular', textAlign:'center', fontSize:14}}>Logout</Text>
						        </TouchableOpacity>
					</View>
                </Body>
            </Header>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		user: state.user
	}
}

export default connect(mapStateToProps)(CheckLogin);

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    drawerHeader: {
      height: 150,
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

