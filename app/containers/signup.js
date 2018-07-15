const React = require('react');
const ReactNative = require('react-native');
import Button from 'apsl-react-native-button';
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Model from "../model/Model";
import * as firebase from "firebase";
import Database from "../model/Database";
const {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} = ReactNative;
var Global = require('../Global');
var logo = require('../image/login.jpg');
var { gStyle, } = Global;



class Signup extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = { 
        Email: '',
        Password: '',
        Username: '',
        isLoading: false,
        arrayUsername: [],
        loadInterval: true,
        loading: false,
    };        
  }  

  componentDidMount() {
      this.setState({loading: true});
      this.props.getUsernameList(this);
  }  
  
  render() {
    var _this = this;
    const leftButtonConfig = {
        title: '< Back',
        style: {
          marginTop: 15,
        },
        tintColor: 'white',
        handler: function () {
            //if(_this.state.isLoading) return;
            Actions.pop();
        },
    };
   
    const titleConfig = {
        title: 'R e g i s t e r',
        tintColor: 'yellow',
        style: {
            fontSize: 20,
            fontFamily: '28 Days Later'
        }
    };
    return (
            
            <Image source = {logo} style = {{flex: 1, flexDirection: 'column', resizeMode: 'stretch', alignSelf: 'stretch'}}>
                <NavigationBar
                    style = {{backgroundColor: '#1d1d1d', marginTop:-20, height:80}}
                    title = {titleConfig}
                    leftButton = {leftButtonConfig}
                />
                <Spinner visible = {this.state.loading} textContent="" textStyle={{color: '#111'}} /> 
                <View style = {{marginTop: 10, padding:25}}>
                    <TextInput
                        style = {[gStyle.button, {borderWidth: 0.5, borderColor: 'black', textAlign: 'center', color: 'black', fontSize: 15}]}
                        placeholder = "Email Address"
                        placeholderTextColor = "black"
                        underlineColorAndroid='transparent'
                        keyboardType = 'email-address'
                        onChangeText = {(text) => this.setState({ Email: text.replace(/ /g, "") })}
                        value = {this.state.Email}
                    />      
                    <TextInput
                        style = {[gStyle.button, {borderWidth: 0.5, borderColor: 'black', textAlign: 'center', color: 'black', fontSize: 15}]}
                        placeholder = "Username"
                        placeholderTextColor = "black"
                        underlineColorAndroid='transparent'
                        onChangeText = {(text) => this.setState({ Username: text.replace(/ /g, "") })}
                        value = {this.state.Username}
                    />
                    <TextInput
                        style = {[gStyle.button, {borderWidth: 0.5, borderColor: 'black', textAlign: 'center', color: 'black', fontSize: 15}]}
                        placeholder = "Password"
                        placeholderTextColor = "black"
                        underlineColorAndroid='transparent'
                        secureTextEntry = {true}
                        onChangeText = {(text) => this.setState({ Password: text.replace(/ /g, "") })}
                        value = {this.state.Password}
                    />         

                    <Button style = {[gStyle.button, {backgroundColor: '#FF0000CC', margin: 20}]}
                        textStyle = {{color: 'white'}}
                        isDisabled = {this.state.isLoading}
                        isLoading = {this.state.isLoading}
                        activityIndicatorColor = 'yellow'
                        onPress = {() => this.signup(this.state.Email, this.state.Username, this.state.Password)}>
                        <Text style = {{fontFamily: '28 Days Later', fontSize: 15, color: 'white'}}>Register</Text>
                    </Button>
                </View>
                
            </Image>
    );
  }    

    async signup(email, username, pass) {
        if(username.length < 6){
            alert("The length of username must be over 6.");
            return;
        }
        else if(!this.checkUsername(username)){
            alert("The username (" + username + ") already exists.");
            return;
        }
        else if(pass.length == 0){
            alert("The length of password must be over 6.");
            return;
        }
        
        
        this.setState({ isLoading: true });
        try {
            let user = await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
            
            Database.setUserDetail(user.uid, email, username);
            Alert.alert("Msg", "SignUp Success!");
            this.props.onSignupSuccess(user.uid, email, username);
            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            this.setState({ isLoading: false });
            console.log(error.toString())
            Alert.alert(error.toString());
        }

    }

    checkUsername(name) {
        var index = this.state.arrayUsername.indexOf(name);
        if(index > -1) return false;
        else return true;
    }
    
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(() => {return {}}, mapDispatchToProps)(Signup);