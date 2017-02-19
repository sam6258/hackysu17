/*  All of the Lambda database logic is conducted in this file  */

var https = require('https');
var request = require('request');
var queryString = require('querystring');
var firebase = require('firebase');

var serviceAcount = require("./facematch-7e281650318b.json");

firebase.initializeApp({
  apiKey: "AIzaSyBtyrKDzQ_tWlNeQMmJJamirRC4_DDLO8Y",
  authDomain: "facematch-3dc91.firebaseapp.com",
  databaseURL: 'https://facematch-3dc91.firebaseio.com/'
});

/* Access to database */
var ref = firebase.database().ref('Alexa');
var root = firebase.database().ref();

function Database(){
}

/* This function is called when this skill is initiated, writes facial recognition indicator
   to database as well as listens for changes sent from the local Raspberry Pi */
Database.prototype.writeDatabase = function(callback){
    ref.child("Write").set("");
    ref.child("Write").set("callFacialRecog");           //Gives the Raspberry Pi indication to start the facial recognition process
    console.log("after set");

    ref.child("Read").on("value", function(snap) {
        if (snap.val() == "noPerson"){
            console.log("database.js: " + snap.child("Read").val());
            ref.child("Write").set("");
            ref.child("Read").set("");
            console.log("noPerson callback");
            callback("noPerson");
        }
        else if(snap.val() != null && snap.val() != ""){                      //to the database (Raspberry Pi writes 'doneRecog (Name of identified person) to DB')
            var name = snap.val();
            console.log(name);
            ref.child("Write").set("");
            ref.child("Read").set("");
            callback(name);                      //Callsback with name of person at the door to be handled in index.js
        }
        else {
            console.log("OBJ is null and should be null");
        }
    });
/*

    ref.on("child_changed", function(snap){            //When the Facial recognition process is complete, this listens for changes
        if(snap.val()){                      //to the database (Raspberry Pi writes 'doneRecog (Name of identified person) to DB')
            var name = snap.val();
            console.log(name);
            ref.child("Write").set("");
            ref.child("Read").set("");
            callback(name);                      //Callsback with name of person at the door to be handled in index.js
         }
        else {
            console.log("database.js: " + snap.child("Read").val());
            ref.child("Write").set("");
            ref.child("Read").set("");
            callback("noPerson");
        }
    });
*/
}

module.exports = Database;

