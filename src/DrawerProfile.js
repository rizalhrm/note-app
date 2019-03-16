import React from 'react';
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native';
import { Header, Body } from 'native-base'
import { connect } from 'react-redux';

class DrawerProfile extends React.Component {

    render(){
        return (
            <Header style={styles.drawerHeader}>
                <Body>
                    <Image
                    style={styles.drawerImage}
                    source={require('../assets/DrawerIcons/icon.png')} />
                    <View style={{flexDirection:'column', justifyContent:'center', alignSelf: 'center', paddingHorizontal:10, paddingVertical: 10}}>
                        <View>
                            <Text style={styles.drawerName}>rizal54@gmail.com</Text>
                        </View>
					</View>
                </Body>
            </Header>
        )
    }
}

const mapStateToProps = (state) => {
	return {
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

