'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.eccf5e18-bfbd-4065-ae94-3149f2c5cc6a';
var Database = require('./py_facematch/database.js');

var database = new Database();

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'CheckDoorIntent': function () {
        var self = this;
        initiatePiFacialRecognition(function(obj){
            if (obj) {
                if (obj == "noPerson") {
                    self.emit(':tell', 'I couldn\'t recognize who\'s at the door');
                    return;
                }
                else {
                    self.emit(':tell', obj + '\'s at the door.');
                    return;
                }
            }
        });
        return;
    },
    'Amazon.HelpIntent': function () {
        self.emit(':ask', 'Say Hello!', 'Say Hello!');
        return;
    }
};


/* Initiates facial recognition that is handled on the Raspberry Pi */
function initiatePiFacialRecognition(piCallback){
    database.writeDatabase(function(obj){
        piCallback(obj);
    });
}