'use strict';

const React = require('react');
const ReactNative = require('react-native');
const StyleSheet = require('StyleSheet');
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from 'apsl-react-native-button';
import * as firebase from "firebase";
import Database from "../model/Database";
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'

const {
  Alert,
  ListView,
  TextInput,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform
} = ReactNative;

var Global = require('../Global');
var { gStyle, } = Global;
var nextImage = require('../image/eye.png');
const prefix = ((Platform.OS === 'android') ? 'file://' : '');


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class GameRoom extends React.Component {
  
    constructor(props) {
        super(props);    
        this.state = { 
        number: "",
        loading: false,
        row: 0,
        img: {},
        dataSource: ds,
        isEmpty: false,
        rowDatas: []
        };
        
    }  
  
    componentDidMount() {
        this.setState({loading: true});
        this.props.loadPosts(this, ds);  
    }

    componentWillUnmount () {
        this.mounted = false;
    }

    typeOf (obj) {
            return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
    }  
    
    render() {
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
        const rightButtonConfig = {
            title: 'Post',
            style: {
            marginTop: 15,
            },
            tintColor: 'white',
            handler: function () {
                Actions.Upload();
            },
        };
        const titleConfig = {
            title: this.props.username,
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
                        rightButton = {rightButtonConfig}
                        leftButton = {leftButtonConfig}
                    />
                    
                    <Spinner visible = {this.state.loading} textContent="" textStyle={{color: '#111'}} /> 
                    <View style = {{flex: 1, backgroundColor: 'white'}}>
                        {this.state.isEmpty == true?<Empty />:
                        <ListView
                            dataSource = {this.state.dataSource}
                            enableEmptySections = {true}
                            renderRow = {(rowData) => {
                                

                                return(             
                                        <TouchableOpacity  onPress = {() => this.gotoPostRoom(rowData)} style = {{margin: 10, marginBottom: 0, borderColor: 'black', borderBottomWidth: 0.2, flex: 1, flexDirection: 'column'}}>
                                            <View style = {{flex: 1, flexDirection: 'row'}}>
                                                <Text style = {{color: 'blue', fontSize: 20}}>{this.convertTitle(rowData.image)}</Text>
                                            </View>
                                            <View style = {{flex: 1, flexDirection: 'row', padding: 5}}>
                                                <Text style = {{color: 'gray', fontSize: 12, flex: 1, textAlign: 'right'}}>{rowData.username}</Text>
                                            </View>
                                        </TouchableOpacity>
                                );
                            }
                
                            }>
                        </ListView>
                        }
                    </View>
                    
                </View>
        );
    }

    convertTitle(data) {
        var imagename = data.split('-Mickey2015-')[0];
        return imagename;
    }

    gotoPostRoom(data) {
        Actions.postview();
        Global.selectedPost = data.post_id;
        Global.selectedImage = data.image;
    }

    reviewPost() {
        alert("clicked");
            // <View style = {{flex: 0.8, flexDirection: 'row'}}>
            //     <Text style = {{flex: 0.6, color: 'yellow', fontSize: 20}}>{this.convertTitle(rowData)}</Text>
            //     <Text style = {{flex: 0.2, color: 'gray', fontSize: 20}}> ( {rowData.username} )</Text>
            // </View>
            // <TouchableOpacity style = {{flex: 0.2, alignItems: 'flex-end'}} onPress = {() => this.reviewPost()}>
            //     <Image source={nextImage} style = {{width: 30, height: 30}}/>
            // </TouchableOpacity>
    } 
    
    
}

var Empty = React.createClass({
    render: function() {
        return (
            <Text style = {{paddingTop: 250, color: 'gray', textAlign: 'center'}}>
                There are no results.
            </Text>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        username: state.Username
    }
}, mapDispatchToProps)(GameRoom);