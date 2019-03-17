import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { convertToObject } from "react-native-cn-richtext-editor";
import CNStyledText from "react-native-cn-richtext-editor";
import { Icon, Fab, Header, Left, Right, Body, Title } from 'native-base'

import { connect } from 'react-redux'

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

class UpdateNote extends Component {

    constructor(props) {
        super(props);
        let content = props.navigation.state.params.item.content;
        this.state = {
            contents: [],
            content : content,
            isScrolled: false,
            layoutWidth: 400
        };

        this.flip = this.flip.bind(this);

    }

    componentDidMount() {
        let items = convertToObject(this.state.content);

        this.setState({
            contents: items
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text != this.props.text) {
            let items = convertToObject(nextProps.text);

            this.setState({
                contents: items
            });
        }
    }
    flip() {
        if (!this.state.isScrolled && this.props.onTap) {
            this.props.onTap();
        }
    }

    renderText(input, index) {
        let color = this.props.color ? this.props.color : '#000';

        return (
            <Text
                key={input.id}
                style={{
                    borderWidth: 0,
                    flex: 1,
                    color: color
                }}
            >
                {
                    this.state.contents.map(input.content, (item) => {

                        return (
                            <CNStyledText key={item.id} style={item.styleList} text={item.text} />
                        );
                    })

                }
            </Text>
        );
    }

    renderImage(image, index) {
        const { width, height } = image.size;
        const { layoutWidth } = this.state;
        let myHeight = height * (layoutWidth / width); 
        let myWidth = layoutWidth
        
        return (
            <View key={`image${index}`}
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <View>
                    <Image

                        style={{
                            width: myWidth, height: myHeight
                            , opacity: this.state.imageHighLightedInex === index ? .8 : 1
                        }}
                        source={{ uri: image.url }}
                    />
                </View>
            </View>

        );
    }

    onLayout = (event) => {
        const {
            x,
            y,
            width,
            height
        } = event.nativeEvent.layout;

        this.setState({
            layoutWidth : width - 2
        })
    }

  render() {
    const { contents } = this.state;
    const { style } = this.props;

    let styles = style ? style : {};
    return (
      <View
      style={{
          flex: 1,
          backgroundColor:'#eee',
          flexDirection: 'column', 
          justifyContent: 'flex-end'
      }}>
      
      <View style={{flex: 0.1}}>
        <Header style={{backgroundColor: '#fff'}}>
            <Left>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeDrawer')}>
                <Icon style={styles.myicon} name='arrow-back'/>
                </TouchableOpacity>
            </Left>
            <Body>
                <Text style = { styles.label }> Detail My Note </Text>
            </Body>
            <Right/>
        </Header>
       </View>

       <View
            onLayout={this.onLayout}
            style={[styles]}
                onStartShouldSetResponder={(evt) => {
                    this.setState({ isScrolled: false });
                    setTimeout(this.flip, 100);
                    return true;
                }}
                onResponderMove={(evt) => {
                    this.setState({ isScrolled: true });
                    return true;
                }}
            >
                {
                    this.state.contents.map(contents, (item, index) => {
                        if (item.component === 'text') {
                            return (
                                this.renderText(item, index)
                            )
                        }
                        else if (item.component === 'image') {
                            return (
                                this.renderImage(item, index)
                            )
                        }

                    })
                }
            </View>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      note : state.note
    }
}

export default connect(mapStateToProps)(UpdateNote)

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        alignItems: 'stretch',
        alignContent: 'flex-start'
    },
    myicon : {
        color: 'black',
        marginLeft: 8,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    }
  });