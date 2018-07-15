import React, { Component } from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Button from 'apsl-react-native-button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import * as firebase from "firebase";
const Database = require('../model/Database');
const {
  Alert,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  
} = ReactNative;
var Global = require('../Global');
var logo = require('../image/login.jpg');
var { gStyle, } = Global;



class Login extends Component {
  
  
  constructor(props) {
      super(props)
      this.state = {
          isLoading: false,
          email: '',
          password: ''
      }
  }
  componentDidMount() {
        //this.getData('http://ngps.fmbtechservices.com/getLocations.php');
        this.props.initEmail(this);
  }

  render() {
    
        return (
            <View style = {{flex: 1, flexDirection: 'row'}}>
            <Image source = {logo} style = {{flex: 1, flexDirection: 'column', resizeMode: 'stretch', alignSelf: 'stretch'}}>
                    <View style = {{flex: 0.4}}>
                    </View>
                    <View style = {{flex: 0.6, padding: 30}}>
                    <Text style = {{backgroundColor: 'transparent', fontSize: 30, textAlign: 'center', fontFamily: '28 Days Later'}}>GAME UP</Text>
                    <TextInput
                        style = {[gStyle.button, {borderWidth: 0.5, borderColor: 'black', textAlign: 'center', color: 'black', fontSize: 15}]}
                        placeholder = "Email Address"
                        placeholderTextColor = "black"
                        underlineColorAndroid='transparent'
                        keyboardType = 'email-address'
                        onChangeText = {(Text) => this.setState({email: Text})}
                        value = {this.state.email}
                    />
                    <TextInput
                        style = {[gStyle.button, {borderWidth: 0.5, borderColor: 'black', textAlign: 'center', color: 'black', fontSize: 15}]}
                        placeholder = "Password"
                        placeholderTextColor = "black"
                        underlineColorAndroid='transparent'
                        secureTextEntry = {true}
                        onChangeText = {(Text) => this.setState({password: Text})}
                        value = {this.state.password}
                    />         

                    <Button 
                    style = {[gStyle.button, {backgroundColor: '#FF0000CC'}]}
                    textStyle = {{color: 'white'}}
                    isDisabled = {this.state.isLoading}
                    isLoading = {this.state.isLoading}
                    activityIndicatorColor = 'black'
                    onPress = {() => this.signin(this.state.email, this.state.password)}>
                    <Text style = {{fontSize: 15, color: 'white', fontFamily: '28 Days Later'}}>Log In</Text>
                    </Button>

                    <View style = {gStyle.button}>
                        <TouchableOpacity  onPress = {() => this.signup()}>
                            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontFamily: '28 Days Later'}}>New User? Register</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
            </Image>
            </View>
        );
    }    

    async signin (email, pass) {
        this.setState({isLoading: true})
        try{
            let user = await firebase.auth().signInWithEmailAndPassword(email, pass);
            this.props.onLogin(email, pass, user, this);  
        } catch (error) {
            this.setState({isLoading: false})
            alert(error.toString());
                
        }      
    }

    signup(){
        Actions.signup();
    }
    
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(() => {return {}}, mapDispatchToProps)(Login);
