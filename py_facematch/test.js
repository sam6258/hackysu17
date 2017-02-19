var Database = require('./database.js');

var database = new Database();

initiatePiFacialRecognition(function(obj){
      if (obj) {
          if (obj == "noPerson") {
              console.log('I couldn\'t recognize who\'s at the door');
          }
          else {
              console.log(obj + '\'s at the door.');
          }
      }
      else {
         console.log("obj is null");
      }
  });

/* Initiates facial recognition that is handled on the Raspberry Pi */
function initiatePiFacialRecognition(piCallback){
    database.writeDatabase(function(obj){
        piCallback(obj);
    });
}