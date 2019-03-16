import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles } from "react-native-cn-richtext-editor";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';
import ImagePicker from 'react-native-image-picker';
import { Icon, Fab, Header, Left, Right, Body, Title } from 'native-base'

import { connect } from 'react-redux'
import { createNote } from '../public/redux/actions/note';

const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
const defaultStyles = getDefaultStyles();

class NewNote extends Component {

  constructor(props) {
    super(props);

    let title = '';

    this.state = {
        title: title,
        selectedTag : 'body',
        selectedStyles : [],
        value: [getInitialObject()],
        selectedColor : 'default',
        selectedHighlight: 'default',
        colors : ['red', 'green', 'blue'],
        highlights:['yellow_hl','pink_hl', 'orange_hl', 'green_hl','purple_hl','blue_hl']
    }

    this.editor = null;
  }

    onStyleKeyPress = (toolType) => {

        if (toolType == 'image') {
            return;
        }
        else {
            this.editor.applyToolbar(toolType);
        }

    }


    onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => {  
        const colors = this.state.colors;  
        const highlights = this.state.highlights;  
        let sel = styles.filter(x=> colors.indexOf(x) >= 0);

        let hl = styles.filter(x=> highlights.indexOf(x) >= 0);
        this.setState({
            selectedStyles: styles,
            selectedColor : (sel.length > 0) ? sel[sel.length - 1] : 'default',
            selectedHighlight : (hl.length > 0) ? hl[hl.length - 1] : 'default',
        })
    }

    onValueChanged = (value) => {
        this.setState({
            value: value
        });
    }

    handleSave = async () => {
        this.props.dispatch(createNote({title: this.state.title, content: this.state.value}))
        .then( res => {
            this.props.navigation.navigate("HomeDrawer");
            console.log(this.state.value)
        })
        .catch( err => {
            alert('message : ' + err)
        })
    }

    insertImage(url) { 
        this.editor.insertImage(url);
    }

    useLibraryHandler = async () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('Image Picker Error: ', response.error);
        }

        else {
            this.insertImage(response.uri);
        }
        }); 
    };

    useCameraHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            base64: false,
        });
        console.log(result);

        this.insertImage(result.uri);
    };


    onImageSelectorClicked = (value) => {
        if(value == 1) {
            this.useCameraHandler();    
        }
        else if(value == 2) {
            this.useLibraryHandler();         
        }   
    }

    onColorSelectorClicked = (value) => {
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedColor);
        }
        else {
            this.editor.applyToolbar(value);
            
        }

        this.setState({
            selectedColor: value
        });
    }

    onHighlightSelectorClicked = (value) => {
        if(value === 'default') {
            this.editor.applyToolbar(this.state.selectedHighlight);
        }
        else {
            this.editor.applyToolbar(value);
        }

        this.setState({
            selectedHighlight: value
        });
    }


renderImageSelector() {
  return (
      <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
      <MenuTrigger>
          <MaterialCommunityIcons name="image" size={28} color="#737373" />
      </MenuTrigger>
      <MenuOptions>
          <MenuOption value={1}>
              <Text style={styles.menuOptionText}>
                  Take Photo
              </Text>
          </MenuOption>
          <View style={styles.divider}/>
          <MenuOption value={2} >
              <Text style={styles.menuOptionText}>
                  Photo Library
              </Text>
          </MenuOption>
          <View style={styles.divider}/>
          <MenuOption value={3} >
              <Text style={styles.menuOptionText}>
                  Scanner
              </Text>
          </MenuOption>  
          <View style={styles.divider}/>
          <MenuOption value={4}>
              <Text style={styles.menuOptionText}>
                  Cancel
              </Text>
          </MenuOption>
      </MenuOptions>
      </Menu>
  );

}

renderColorMenuOptions = () => {

  let lst = [];

  if(defaultStyles[this.state.selectedColor]) {
       lst = this.state.colors.filter(x => x !== this.state.selectedColor);
       lst.push('default');
      lst.push(this.state.selectedColor);
  }
  else {
      lst = this.state.colors.filter(x=> true);
      lst.push('default');
  }

  return (
      
      lst.map( (item) => {
          let color = defaultStyles[item] ? defaultStyles[item].color : 'black';
          return (
              <MenuOption value={item} key={item}>
                  <MaterialCommunityIcons name="format-color-text" color={color}
                  size={28} />
              </MenuOption>
          );
      })
      
  );
}

renderHighlightMenuOptions = () => {
  let lst = [];

  if(defaultStyles[this.state.selectedHighlight]) {
       lst = this.state.highlights.filter(x => x !== this.state.selectedHighlight);
       lst.push('default');
      lst.push(this.state.selectedHighlight);
  }
  else {
      lst = this.state.highlights.filter(x=> true);
      lst.push('default');
  }

  return (
      
      lst.map( (item) => {
          let bgColor = defaultStyles[item] ? defaultStyles[item].backgroundColor : 'black';
          return (
              <MenuOption value={item} key={item}>
                  <MaterialCommunityIcons name="marker" color={bgColor}
                  size={26} />
              </MenuOption>
          );
      })
      
  );
}

renderColorSelector() {
 
  let selectedColor = '#737373';
  if(defaultStyles[this.state.selectedColor])
  {
      selectedColor = defaultStyles[this.state.selectedColor].color;
  }
  

  return (
      <Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
      <MenuTrigger>
          <MaterialCommunityIcons name="format-color-text" color={selectedColor}
                  size={28} style={{
                      top:2
                  }} />             
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
          {this.renderColorMenuOptions()}
      </MenuOptions>
      </Menu>
  );
}

renderHighlight() {
  let selectedColor = '#737373';
  if(defaultStyles[this.state.selectedHighlight])
  { 
      selectedColor = defaultStyles[this.state.selectedHighlight].backgroundColor;
  }
  return (
      <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
      <MenuTrigger>
          <MaterialCommunityIcons name="marker" color={selectedColor} size={24} />             
      </MenuTrigger>
      <MenuOptions customStyles={highlightOptionsStyles}>
          {this.renderHighlightMenuOptions()}
      </MenuOptions>
      </Menu>
  );
}
    alertku = () => {
        alert("Lah Lah")
    }

  render() {
    console.log(this.state.value)
    return (
      <View
      behavior="padding"
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
                <Text style = { styles.label }>Create New Note</Text>
            </Body>
            <Right>
                <TouchableOpacity onPress={this.handleSave}>
                <Icon style={styles.save} name='checkmark'/>
                </TouchableOpacity>
            </Right>
        </Header>
       </View>

        <MenuProvider style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
            <View style={styles.main}>
                <TextInput
                placeholder="Input Title"
                placeholderTextColor="#c3c3c3"
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                style={{color: '#000', fontSize: 18, backgroundColor: '#fff', marginBottom: 5 }}
                />
                <CNRichTextEditor                   
                    ref={input => this.editor = input}
                    onSelectedTagChanged={this.onSelectedTagChanged}
                    onSelectedStyleChanged={this.onSelectedStyleChanged}
                    value={this.state.value}
                    style={{ backgroundColor : '#fff'}}
                    styleList={defaultStyles}
                    onValueChanged={this.onValueChanged}
                />                      
            </View>
        </TouchableWithoutFeedback>
        </View>

        <View>
            <CNToolbar
                size={28}
                bold={<MaterialCommunityIcons name="format-bold" />}
                italic={<MaterialCommunityIcons name="format-italic" />}
                underline={<MaterialCommunityIcons name="format-underline" />}
                lineThrough={<MaterialCommunityIcons name="format-strikethrough-variant" />}
                body={<MaterialCommunityIcons name="format-text" />}
                title={<MaterialCommunityIcons name="format-header-1" />}
                heading={<MaterialCommunityIcons name="format-header-3" />}
                ul={<MaterialCommunityIcons name="format-list-bulleted" />}
                ol={<MaterialIcons name="format-list-numbered" />}
                image={this.renderImageSelector()}
                foreColor={this.renderColorSelector()}
                highlight={this.renderHighlight()}
                selectedTag={this.state.selectedTag}
                selectedStyles={this.state.selectedStyles}
                onStyleKeyPress={this.onStyleKeyPress} 
                />
        </View>
        </MenuProvider>
    </View>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      note : state.note
    }
}

export default connect(mapStateToProps)(NewNote)

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
    menuOptionText: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 18
    },
    divider: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    myicon : {
        color: 'black',
        marginLeft: 8,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    mysave : {
        color: 'black',
        marginRight: 8,
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

  const optionsStyles = {
    optionsContainer: {
        backgroundColor: 'yellow',
        padding: 0,   
        width: 40,
        marginLeft: width - 40 - 30,
        alignItems: 'flex-end'
    },
    optionsWrapper: {
        backgroundColor: 'white'
    },
    optionWrapper: {
        margin: 2
    },
    optionTouchable: {
        underlayColor: 'gold',
        activeOpacity: 70
    }
  };

 const highlightOptionsStyles = {
    optionsContainer: {
        backgroundColor: 'transparent',
        padding: 0,   
        width: 40,
        marginLeft: width - 40,

        alignItems: 'flex-end',
    },
    optionsWrapper: {
        backgroundColor: 'white',
    },
    optionWrapper: {
        margin: 2,
    },
    optionTouchable: {
        underlayColor: 'gold',
        activeOpacity: 70,
    }
};