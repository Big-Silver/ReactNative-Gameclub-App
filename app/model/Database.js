import * as firebase from "firebase";
var Global = require('../Global');
class Database {

    /**
     * Sets a users mobile number
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setUserDetail(userId, email, username) {

        let userMobilePath = "/user/" + userId + "/details";

        return firebase.database().ref(userMobilePath).set({
            email: email,
            username: username
        })

    }

    /**
     * Listen for changes to a users mobile number
     * @param userId
     * @param callback Users mobile number
     */
    static listenUserDetails(callback) {

        let usersPath = "/user";

        firebase.database().ref(usersPath).on('value', (snapshot) => {

            var UsersData = [];

            if (snapshot.val()) {
                UsersData = snapshot.val();
            }

            callback(UsersData)
        });
    }

    static listenGameList(callback) {
        let usersPath = "/GameLists";

        firebase.database().ref(usersPath).on('value', (snapshot) => {

            var GameList = [];

            if (snapshot.val()) {
                GameList = snapshot.val();
            }

            callback(GameList)
        });
    }

    static setImagetoGameList(name, time, comment) {
        let userMobilePath = "/Posts/" + Global.selectedGame + "/" + time + '-' + Global.myUsername;

        return firebase.database().ref(userMobilePath).set({
            image: name,
            username: Global.myUsername,
            comment: comment,
            post_id: time + '-' + Global.myUsername
        })
    }

    static getGamePosts(callback){
        let usersPath = "/Posts/" + Global.selectedGame;

        firebase.database().ref(usersPath).on('value', (snapshot) => {

            var Posts = [];

            if (snapshot.val()) {
                Posts = snapshot.val();
            }

            callback(Posts)
        });
    }

    static getPostswithID(callback){
        let usersPath = "/Posts/" + Global.selectedGame + '/' + Global.selectedPost;

        firebase.database().ref(usersPath).on('value', (snapshot) => {

            var Data = {};

            if (snapshot.val()) {
                Data = snapshot.val();
            }

            callback(Data)
        });
    }

    static postComment(stamp, date, comment) {
        let userMobilePath = "/Comments/" + Global.selectedPost + "/" + stamp + '-' + Global.myUsername;

        return firebase.database().ref(userMobilePath).set({
            comment: comment,
            date: date, 
            username: Global.myUsername
        })
    }

    static getCommentFromPost(callback) {
        let usersPath = "/Comments/" + Global.selectedPost;

        firebase.database().ref(usersPath).on('value', (snapshot) => {

            var Data = {};

            if (snapshot.val()) {
                Data = snapshot.val();
            }

            callback(Data)
        });
    }

    static getImagefromURL(imagename, callback) {
        firebase.storage()
        .ref('rn-firebase-upload/' + imagename)
        .getDownloadURL()
        .then((url) => {
            firebase.storage().refFromURL(url).getDownloadURL().then((url) => {
                callback(url);
            })
        })
    }

    static getGameBackgroundImagefromURL(imagename, callback) {
        firebase.storage()
        .ref('game-background/' + imagename)
        .getDownloadURL()
        .then((url) => {
            firebase.storage().refFromURL(url).getDownloadURL().then((url) => {
                callback(url);
            })
        })
    }

    static InitGameList() {
        let userMobilePath = "/GameLists/";

        return firebase.database().ref(userMobilePath).set({
            cs: 'cs.jpg',
            dota: 'dota.jpg',
            lol: 'lol.jpg',
            overwatch: 'overwatch.jpg',
            wow: 'wow.jpg'            
        })
    }

    static deleteComment(key) {
        let CommentPath = "/Comments/" + Global.selectedPost + "/" + key;
        return firebase.database().ref(CommentPath).remove();
    }

    static deletePost() {
        let PostPath = "/Posts/" + Global.selectedGame + "/" + Global.selectedPost;
        firebase.database().ref(PostPath).remove();
        firebase.storage()
        .ref('rn-firebase-upload/' + Global.selectedImage).delete();
        let CommentPath = "/Comments/" + Global.selectedPost;
        return firebase.database().ref(CommentPath).remove();
    }

}

module.exports = Database;