'use strict';

const React = require('react');
const ReactNative = require('react-native');
const StyleSheet = require('StyleSheet');
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from 'apsl-react-native-button';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import * as firebase from "firebase";
import Database from "../model/Database";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Login from './login'
const {
  Alert,
  ListView,
  TextInput,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} = ReactNative;

var Global = require('../Global');
var { gStyle, } = Global;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class HomeView extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = { 
      loading: false,
      dataSource: ds,
      img: {},
      listEmpty: 'false',
      loadInterval: true
    };
    
  }  
  
  componentDidMount() {
      var _this = this;
      this.setState({loading: true});
      Database.listenGameList((Data) => {
              var Posts = [];
              var temp = {};
              var row = 0;
              Object.keys(Data).map(function (key) {  
                  var imagename = Data[key];
                   Posts.push(imagename);
                   _this.setState({ dataSource: ds.cloneWithRows(Posts)});
                   
                   Database.getGameBackgroundImagefromURL(imagename, (url) => {
                       temp[imagename] = {uri: url};
                       _this.setState({img: temp});
                       _this.setState({ dataSource: ds.cloneWithRows(Posts)});
                       if(Object.keys(Data).length == Object.keys(temp).length){
                           _this.setState({loading: false});
                           
                       } 
                   });

              });
              if(Posts.length == 0) this.setState({listEmpty: true});
              
      });
  }

  typeOf (obj) {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
  }  

  async logout() {
    try {

        await firebase.auth().signOut();
        Actions.popTo('login');
        // Navigate to login view

    } catch (error) {
        console.log(error);
    }

}
  
  render() {
    var _this = this;
    const leftButtonConfig = {
        title: 'Log out',
        style: {
          marginTop: 15,
        },
        tintColor: 'white',
        handler: function () {
            _this.logout();
        },
    };
    const titleConfig = {
        title: 'Select Your Game',
        tintColor: 'yellow',
        style: {
            fontSize: 20,
            fontFamily: '28 Days Later'
        }
    };
    return (
            
            <View style = {{flex: 1, backgroundColor: '#2d2d2d'}}>
                <NavigationBar
                    style = {{backgroundColor: '#1d1d1d', marginTop:-20, height:80}}
                    title = {titleConfig}
                    leftButton = {leftButtonConfig}
                />
                
                <Spinner visible = {this.state.loading} textContent="" textStyle={{color: '#111'}} /> 
                <View style = {{flex: 1, backgroundColor: '#2d2d2d'}}>
                    
                    <ListView
                        style = {{flex: 1, flexDirection: 'column'}}
                        dataSource = {this.state.dataSource}
                        renderRow = {(rowData, sectionID, rowID) => {
                            return(   
                                <View style = {{minHeight: 120}}>
                                    <TouchableOpacity  onPress = {() => this.gotoGameRoom(rowData)}>          
                                        <View style = {{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                            <Image style = {{height:120, flex: 1, resizeMode: 'stretch', alignSelf: 'stretch'}} indicator = {ProgressBar} source = {this.state.img[rowData]}>
                                            </Image>
                                        </View>
                                    </TouchableOpacity>
                                </View>    
                            );
                        }
            
                        }>
                    </ListView>
                </View>
                
            </View>
    );
  }

    gotoGameRoom(name) {
        //name: e.g. cs.jpg
        
        this.props.selectRoom(name);
        Global.selectedGame = name.split(".")[0];
        Actions.postlist();
    }
    
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(HomeView);


