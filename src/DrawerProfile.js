import React from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import { Container, Content, Header, Body } from 'native-base'
import { connect } from 'react-redux';

import { getProfile } from './public/redux/actions/auth'

class DrawerProfile extends React.Component {

    // componentDidMount() {
	// 	this.getprofiledata()
	// }

	// getprofiledata = async () => {
	// 	try {
    //         const id = this.props.auth.data.id;
    //         const token = this.props.auth.access_token.token;

	// 		await this.props.dispatch(getProfile(id, token))
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
                    <View style={{flexDirection:'column', justifyContent:'center', alignSelf: 'center', paddingHorizontal:10, paddingVertical: 10}}>
                        <View>
                            <Text style={styles.drawerName}>Rizal Hermawan</Text>
                        </View>
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

export default connect(mapStateToProps)(DrawerProfile);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 140,
        backgroundColor: '#c3c3c3'
    },
    drawerImage: {
        height: 75,
        width: 75,
        borderRadius: 75,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    drawerName: {
        color: '#000',
        justifyContent:'center',
        alignSelf: 'center',
        fontFamily: 'Roboto-Bold'
    }
})

