'use strict';
var Alexa = require("alexa-sdk");
var appId = 'amzn1.ask.skill.eccf5e18-bfbd-4065-ae94-3149f2c5cc6a';


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello World!');
    },
    'Amazon.HelpIntent': function () {
        this.emit(':ask', 'Say Hello!', 'Say Hello!');
    }
};
