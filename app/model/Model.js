var Global = require('../Global');

class Model  {

    static getDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = mm+'-'+dd+'-'+yyyy;
        return today;
    }

    static checkEmptyField(string) {
        if(string.replace(/ /g, "").replace(/\n/g, "").length == 0){
            return true;
        }
        return false;
    }



}

module.exports = Model;