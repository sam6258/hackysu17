/*  This program is running on the Local Raspberry Pi, The other files in this repository are 
    running on the cloud in Lambda  */

var request = require('request');
var firebase = require('firebase');

const spawn = require('child_process').spawn;
const fs = require('fs');

var serviceAcount = require("./facematch-7e281650318b.json");

firebase.initializeApp({
  apiKey: "AIzaSyBtyrKDzQ_tWlNeQMmJJamirRC4_DDLO8Y",
  authDomain: "facematch-3dc91.firebaseapp.com",
  databaseURL: 'https://facematch-3dc91.firebaseio.com/'
});

/* Local Database Access */
var ref = firebase.database().ref("Alexa");
var picName = './capture.png';

/* The Raspberry Pi is always listening to the database to see if voice commands to Alexa are issued */
ref.on("child_changed", function(snap) {
  console.log("initial data loaded!", snap.key +":",snap.val());
  if(snap.val() == 'callFacialRecog'){                                              //After the Alexa application is triggered by onLaunch or DoorIntent
    var dataString = "";
    
    const py = spawn('python',['./capture.py']);   //Snaps a picture of whatever is in front of the door
    py.stdout.on('data', function(data){
      dataString += data.toString();
    });

    py.stdout.on('end', function(){
      var dataString2 = "";
      const py2 = spawn('python', ['callrecog.py', picName]);
      py2.stdout.on('data', function(data) {
        dataString2 += data.toString();
      });

      py2.stdout.on('end', function() {
        dataString2 = dataString2.replace(/'/g, "\"");
        dataString2 = JSON.parse(dataString2);
        console.log(dataString2);
        if (dataString2.length == 0) {
          ref.child("Read").set("noPerson");
        }
        else {
          ref.child("Read").set(dataString2[0].name);
	  var dataString3 = "";
	  const py3 = spawn('python', ['create_mp3', 'Greetings, ' + dataString2[0].name + ', someone\'s coming to the door']);
	  py3.stdout.on('data', function(data) {
		dataString3 += data.toString();
	  });

	  py3.stdout.on('end', function() {
	     	//do nothing	
	  });
          console.log("setting READ in db to : " + dataString2[0].name);
        }
      });
    });
  }
});
