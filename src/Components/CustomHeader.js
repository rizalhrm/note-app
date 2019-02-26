import React, { Component } from "react";
import { Header, Body, Title, Left, Icon, Right } from 'native-base'

class CustomHeader extends Component {
    render() {
        return (
            <Header style={{backgroundColor: '#fff'}}>
                <Left><Icon name="menu" onPress={() => this.props.drawerOpen()} /></Left>
                <Body>
                    <Title style={{color: '#000', fontFamily: 'Roboto-Bold'}}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;