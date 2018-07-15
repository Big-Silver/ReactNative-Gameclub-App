var React = require('react-native')
var {StyleSheet} = React
var Global = require('./Global');
var globalStyle = StyleSheet.create({
	container: {
        flex: 1
    },
    textInput: {
        height: 40,
        margin: 10,
        borderColor: 'white',  
        borderBottomWidth: 1, 
        justifyContent: 'center',
    },
    buttonView: {
        paddingTop: 10, 
        justifyContent: 'center',
    },

    PageView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    button: {
        backgroundColor: '#00000000',
        borderWidth: 0,
        height: 40,
        borderRadius: 20,
        margin: 15,        
    },
    gameItem: {
        flexDirection: 'row',
        flex: 1,
        padding: 20,
    },
    rowImageContainer: {
        flex: 0.2,
        marginRight: 10,
        justifyContent: 'center',
    },
    rowImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    rowBody: {
        flex: 1,
    },

    rowSetting: {
        flex: 0.2
    },
    
    bold: {
        fontWeight: "bold"
    },

    progressbar: {
        width: 300,
        marginTop: 20,
        height: 20
    },
    
    default_tab_title: {
        fontSize: 15,
        margin: 15,
        color: 'black'
    },
    
    selected_tab_title: {
        fontSize: 15,
        margin: 15,
        color: 'red'
    },
    
    tab_bar: {
       borderTopWidth: 1,
       borderColor: 'gray',
       overflow: 'visible',
       height: 65
    },
    
    bgImageWrapper: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        width: Global.fullWidth,
        height: Global.fullHeight,
        resizeMode: 'stretch'
    },

    HC1: {
        fontSize: 35,
        alignItems: 'center',
    },

    HC2: {
        fontSize: 25,
        alignItems: 'center',
    },

    H1: {
        fontSize: 35,
    },

    H2: {
        fontSize: 20,
        padding: 10,
        color: '#283476'
    },
})

module.exports = globalStyle