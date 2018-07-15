'use strict';

const React = require('react');
const ReactNative = require('react-native');
const StyleSheet = require('StyleSheet');
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-simple-modal';
import Button from 'apsl-react-native-button';
import * as firebase from "firebase";
import Database from "../model/Database";
import Model from "../model/Model";
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

const {
  Alert,
  ListView,
  TextInput,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} = ReactNative;

var Global = require('../Global');
var { gStyle, } = Global;
var trash = require('../image/trash.png');
const prefix = ((Platform.OS === 'android') ? 'file://' : '');


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class GameRoom extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = { 
      img: {},
      comment: '',
      title: '',
      date: '',
      dataSource: ds,
      listEmpty: false,
      modal_open: false,
      commentText: '',
      loading: false,
      isAdmin: false,
    };
    
  }  
  
  componentDidMount() {
      var _this = this;
      var Comments = ['header'];
      this.loadInterval = true;
      this.setState({loading: true});
      Database.getPostswithID((Data) => {
          if(!_this.loadInterval) return;
          _this.setState({comment: Data.comment});
          _this.setState({title: Data.image.split('-Mickey2015-')[0]});
          _this.setState({date: Data.image.split('-Mickey2015-')[1].split('.')[0]});
          
          Database.getImagefromURL(Data.image, (url) => {
              var temp = {uri: url};
              _this.setState({url: JSON.stringify(url)});
              _this.loadInterval && _this.setState({img: temp});
              _this.loadInterval && _this.setState({ dataSource: ds.cloneWithRows(Comments)});
              _this.loadInterval && _this.setState({loading: false});
          });

          Database.getCommentFromPost((Data) => {    
              Comments = ['header'];          
              _this.loadInterval && _this.setState({ dataSource: ds.cloneWithRows(Comments)});
              Object.keys(Data).map(function (key) {  
                Data[key]['key'] = key;
                Comments.push(Data[key]);
                _this.loadInterval && _this.setState({ dataSource: ds.cloneWithRows(Comments)});
              });
          });        
          
      });

      if(Global.myEmail == 'becoolchamp@hotmail.com') this.setState({isAdmin: true});
  }

  componentWillUnmount () {
        this.loadInterval = false;
    }

  typeOf (obj) {
        return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
  }  
  
  render() {
    var _this = this;
    const rightButtonConfig = {
            title: 'Delete',
            style: {
            marginTop: 15,
            },
            tintColor: 'white',
            handler: function () {
                Alert.alert(
                    '',
                    'Are you sure you want to remove this post?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'Yes', onPress: () => {
                            _this.loadInterval = false;
                            Database.deletePost();
                            alert('Deleted successfully!');
                            Actions.pop();
                        }},
                    ],
                    { cancelable: false }
                )
            },
        };

    const leftButtonConfig = {
        title: '< Back',
        style: {
          marginTop: 15,
        },
        tintColor: 'white',
        handler: function () {
            Actions.pop();
        },
    };
    
    return (
            
            <View style = {{flex: 1}}>
                {this.state.isAdmin == true?
                    <NavigationBar
                        style = {{backgroundColor: '#1d1d1d', marginTop:-20, height:80}}
                        leftButton = {leftButtonConfig}
                        rightButton = {rightButtonConfig}
                    />
                :
                    <NavigationBar
                        style = {{backgroundColor: '#1d1d1d', marginTop:-20, height:80}}
                        leftButton = {leftButtonConfig}
                    />
                }
                
                <Spinner visible = {this.state.loading} textContent="" textStyle={{color: '#111'}} /> 
                <View style = {{flex: 1, paddingBottom: 80}}>
                <ListView
                    dataSource = {this.state.dataSource}
                    enableEmptySections = {true}
                    renderRow = {(rowData, sectionID, rowID, highlightRow) => {
                        
                        return(             
                            rowID == 0?
                            <View style = {{margin: 10, flex: 1, flexDirection: 'column'}}>
                                <TouchableOpacity onPress = {() => Actions.Preview({img: this.state.img})}>
                                <View style = {{flex: 1, flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                                    
                                        <Image style = {{minHeight:300, flex: 0.9, alignSelf: 'stretch'}} indicator = {ProgressBar} source = {this.state.img}>
                                        </Image>
                                    
                                </View>
                                </TouchableOpacity>
                                <View style = {{flex: 1, minHeight: 40, flexDirection: 'row', padding: 10}}>
                                    <Text style = {{color: 'black', fontWeight: 'bold', fontSize: 20}}>{this.state.title}</Text>
                                </View>
                                <View style = {{flex: 1, height: 20, flexDirection: 'row'}}>
                                    <Text style = {{color: 'gray', fontSize: 16, flex: 1, textAlign: 'right', fontStyle: 'italic', paddingRight: 10}}> {Global.myUsername} - {this.state.date}</Text>
                                </View>
                                
                                <View style = {{flex: 1, flexDirection: 'row'}}>
                                <Text style = {{fontSize: 18, fontStyle: 'italic', color: 'black', padding: 10}}>{this.state.comment}</Text>
                                </View>
                                <View style = {{flex: 1, flexDirection: 'row', borderColor: 'black', borderTopWidth: 0.5}}>
                                <Text style = {{flex: 1, fontSize: 18, color: 'black', padding: 10, fontFamily: '28 Days Later', textAlign: 'center'}}>- COMMENTS -</Text>
                                </View>
                            </View>
                            :
                            <View style = {{margin: 10, flex: 1, flexDirection: 'column'}}>
                                <View style = {{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                                    <View style = {{flex: 0.5}}>
                                        <Text style = {{color: 'gray', fontSize: 16, textAlign: 'left', fontStyle: 'italic'}}> {rowData.username}</Text>
                                    </View>
                                    <View style = {{flex: 0.5}}>
                                        {this._renderDate(rowData)}                                        
                                    </View>
                                </View>
                                
                                <View style = {{flex: 1, flexDirection: 'row', padding: 10}}>
                                    <Text style = {{fontSize: 18, fontStyle: 'italic', color: 'black'}}>{rowData.comment}</Text>
                                </View>
                            </View>
                        );
                    }        
                    }>
                </ListView>
                <View style = {{position: 'absolute', backgroundColor: 'white', bottom: 0, left: 0, right: 0, height: 80, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
                    <Button style = {[gStyle.button, {backgroundColor: '#1d1d1d'}]}
                    textStyle = {{color: 'white'}}
                    onPress = {() => this.setState({modal_open: true})}>
                        <Text style = {{fontFamily: '28 Days Later', fontSize: 15, color: 'white'}}>Post Comment</Text>
                    </Button>
                </View>
                </View>
                <Modal
                    offset = {0}
                    open = {this.state.modal_open}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({modal_open: false})}
                    style = {{alignItems: 'center'}}>
                    <View style = {{backgroundColor: 'white', height: 200, padding: 15, borderColor: 'black', borderWidth: 2}}>
                        <TextInput
                            style = {{color: 'black', height: 100, padding: 5, fontSize: 18, borderColor: 'black', borderBottomWidth: 0.5}}
                            placeholder = "Type here..."
                            placeholderTextColor = "black"
                            underlineColorAndroid='transparent'
                            onChangeText = {(text) => this.setState({ commentText: text })}
                            value = {this.state.commentText}
                            multiline = {true}
                            editable = {true}
                            maxLength = {1024}
                        />
                        <Button style = {[gStyle.button, {backgroundColor: 'black'}]}
                        textStyle = {{color: 'white'}}
                        onPress = {() => this.PostComment()}>
                            <Text style = {{fontFamily: '28 Days Later', fontSize: 15, color: 'white'}}>Post Comment</Text>
                        </Button>
                    </View>
                </Modal>
            </View>
    );
  }

  _renderDate(rowData) {
      if(this.state.isAdmin){
          return (
            <View style = {{flexDirection: 'row', flex: 1}}>
                <View style = {{flex: 0.8}}>
                    <Text style = {{color: 'gray', fontSize: 16, textAlign: 'right', fontStyle: 'italic',  paddingRight: 10}}>
                        {rowData.date}
                    </Text>
                </View>
                <View style = {{flex: 0.2}}>
                    <TouchableOpacity onPress = {() => this._deleteComment(rowData.key)}>
                        <Image source = {trash} style = {{width: 15, height: 20}}/>
                    </TouchableOpacity>
                </View>         
            </View>
          )
      }
      else{
          return(
              <Text style = {{color: 'gray', fontSize: 16, textAlign: 'right', fontStyle: 'italic',  paddingRight: 10}}> {rowData.date}</Text>
          )
      }
  }

  _deleteComment(key) {
    Alert.alert(
        '',
        'Are you sure you want to remove this comment?',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => Database.deleteComment(key)},
        ],
        { cancelable: false }
    )
      
  }

  convertTitle(data) {
      var imagename = data.image.substr(0, data.image.length - 15);
      return imagename;
  }

  PostComment() {
      if(Model.checkEmptyField(this.state.commentText)){
        alert("Your comment is empty!");
        return;
      }
      var timestamp = new Date().getTime();
      Database.postComment(timestamp, Model.getDate(), this.state.commentText);
      this.setState({modal_open: false});      
  }    
    
}

var Empty = React.createClass({
    render: function() {
        return (
            <Text style = {{padding: 20, color: 'gray', textAlign: 'center'}}>
                There are no results.
            </Text>
        );
    }
});

module.exports = GameRoom;