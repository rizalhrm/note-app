import React, { Component } from "react";
import {
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Icon, Button } from 'native-base'
import CustomHeader from '../Components/CustomHeader'

class TagsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Category",
        headerLeft: <Icon name="menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerIcon:
            <Image
                source={require('../../assets/DrawerIcons/settings.png')}
                style={[styles.icon]}
            />

    })

    render() {
        return (

            <Container>

                <CustomHeader
                    title="Edit Profile"
                    drawerOpen={() => this.props.navigation.openDrawer()}
                />
                <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <Button
                        full
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{ color: 'white' }}>Go to Home screen</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}

export default TagsScreen

const styles = StyleSheet.create({
    icon: {
        height: 24,
        width: 24
    }
})