import React from "react";
import { ImageBackground, ActivityIndicator, StyleSheet, Text, View, AsyncStorage } from "react-native";

class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    Async = async () => {
        this.props.navigation.navigate('Drawer');
    };

    componentDidMount() {
        setTimeout(() => {
            this.Async();
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

export default Splash;

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