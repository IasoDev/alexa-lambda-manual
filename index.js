/* This code has been generated from your interaction model

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.



 // 1. Text strings =====================================================================================================
 //    Modify these strings and messages to change the behavior of your Lambda function
 

var reprompt;
var welcomeOutput=['Willkommen! Wie kann ich dir helfen?', 'Hallo! Womit kann ich dir behilflich sein', 'Wobei brauchst du Hilfe','Sage mir, mit was ich dir helfen kann']; 
//var welcomeReprompt = "Sage einfach, wobei dir der Pfleger helfen soll";
 // 2. Skill Code =======================================================================================================
"use strict";
var Alexa = require('alexa-sdk');
var AWS = require("aws-sdk");
const AWSregion = 'eu-west-1';
//var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
//var doc = require('dynamodb-doc');
//var dynamodb = new doc.DynamoDB();
//var docClient = new AWS.DynamoDB.DocumentClient();
var APP_ID =  "amzn1.ask.skill.f6c652ad-92b8-4c79-a29a-3bd683d582ed";
var userId;
var speechOutput = '';
var handlers = {
    'LaunchRequest': function () {
    speechOutput=randomPhrase(welcomeOutput);
    this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = 'Bitte sage mir, wobei du Hilfe benötigst. Ich werde deine Anfrage an den Pfleger weiterleiten. Du kannst auch direkt mit dem Pfleger verbunden werden';
        reprompt = 'Beispiels Anfragen sind: Bitte helfe mir auf die Toilette! Ich kann meinen Fernseher nicht anschalten. Bitte schließe mein Fenster.';
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = 'Drücke den Knopf oder sage meinen Namen Alexa, wenn du wieder Hilfe benötigst!';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        speechOutput = '';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.YesIntent': function () {
        speechOutput = 'Das freut mich!';
        this.emit(':ask', speechOutput);
        
    },
    'AMAZON.NoIntent': function () {
        speechOutput = 'Das tut mir sehr Leid, bitte wiederhole deine Anfrage!';
        this.emit(':ask', speechOutput);
    },
    'SessionEndedRequest': function () {
        speechOutput = '';
        //this.emit(':saveState', true);//uncomment to save attributes to db on session end
        this.emit(':tell', speechOutput);
    },
    "Dinge_im_Zimmer_schliessen": function () {
        var speechOutput = "";
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        speechOutput = "Ein Pfleger wird sich bald um dein Fenster oder Tür kümmern.";
        this.emit(":ask", speechOutput, speechOutput);
    },
    "Medikamente": function () {
        var speechOutput = "";
        //any intent slot variables are listed here for convenience
        var MedizinSlotRaw = this.event.request.intent.slots.Medizin.value;
        console.log(MedizinSlotRaw);
        var MedizinSlot = resolveCanonical(this.event.request.intent.slots.Medizin);
        console.log(MedizinSlot);
        //Your custom intent handling goes here
        speechOutput = "Ein Pfleger wird dir deine Medikamente bringen";
        this.emit(":ask", speechOutput, speechOutput);
    },
    "Toilette": function () {
        var speechOutput;
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        var input=["Ich habe deine Anfrage, dass du auf die Toilette musst, an den Pfleger weitergeleitet", "Der Pfleger kommt gleich, um dir zu helfen, auf die Toilette zu gehen","Der Pfleger weiß Bescheid, jedoch musst du leider noch einen kleinen Moment warten"];
        speechOutput=randomPhrase(input);
        var sicher=nachfrage();
        this.emit(":ask", speechOutput, sicher);
    },
    "Bett": function () {
        var speechOutput;
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        var input=["Ich habe deine Anfrage, dass du das Bett verlassen möchtest, an den Pfleger weitergeleitet", "Der Pfleger kommt gleich, um dir zu helfen, aus dem Bett zu kommen",
            "Der Pfleger weiß Bescheid, jedoch musst du leider noch einen kleinen Moment warten"];
        speechOutput=randomPhrase(input);
        this.emit(":ask", speechOutput, speechOutput);
    },
    "Bewegungshilfe": function () {
        var speechOutput;
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        var input=["Ich habe deine Anfrage, dass du deine Gehhilfe benötigst weitergeleitet", "Deine Gehhilfe wird die bald gebracht!",
                    "Der Pfleger weiß Bescheid. Er wird die bald zur Hilfe kommen"];
        
        speechOutput=randomPhrase(input);
        this.emit(":ask", speechOutput, speechOutput);
    },
    "Notfall": function () {
        //sendSMS("Person X in Raum Y hat einen Notfall");
        var speechOutput;
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        speechOutput = "Ich verbinde dich sofort mit dem Pfleger";
        this.emit(":ask", speechOutput, speechOutput);
    },
   "Verbindung_mit_Pfleger": function () {
        var speechOutput = "";
        //any intent slot variables are listed here for convenience
        var PflegerSlotRaw = this.event.request.intent.slots.Pfleger.value;
        console.log(PflegerSlotRaw);
        var PflegerSlot = resolveCanonical(this.event.request.intent.slots.Pfleger);
        console.log(PflegerSlot);
        if (PflegerSlotRaw == 'krankenschwester' || PflegerSlotRaw == 'pflegerin' || PflegerSlotRaw == 'schwester' ) {
           speechOutput="Die Verbindung zur" +PflegerSlot+ "wird hergestellt"; 
        }
        else if (PflegerSlotRaw == 'pfleger')
            speechOutput="Die Verbindung zum" +PflegerSlot+ "wird hergestellt";
        else if (PflegerSlotRaw == 'arzt' || PflegerSlotRaw == 'ärztin')
            speechOutput="Ich verbinde dich mit jemandem aus dem Pflegepersonal. Diese Person wird alles weitere mit dir besprechen";
        else
            speechOutput="Die Verbindung zum Pflegepersonal wird aufgebaut";
        //Your custom intent handling goes here
        this.emit(":ask", speechOutput, speechOutput);
    },  
    "Fernseher": function () {
        var speechOutput;
        //pushDynamoDB("low","Fernseher",this);
		//var request = {priority:"high",content:"Fernseher",time:"10:23"};
		//this.attributes['request'] = request; 
		//createItemDynamoDb("high","Fernseher");
		putDynamoItem("high","Fernseher", ()=>{
        speechOutput = "Ein Pfleger wird gleich hier sein, um dir mit deinem Fernseher zu helfen";
        this.emit(":ask", speechOutput, speechOutput);
        });
    },
    'Unhandled': function () {
        speechOutput = "Ich habe leider nicht verstanden, wobei du Hilfe bnötigst. Ich verbinde dich direkt mit dem Pfleger";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.appId = APP_ID
    userId = event['session']['user']['userId'];
    alexa.registerHandlers(handlers);
    alexa.execute();
};


//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

//put request into DynamoDB
function putDynamoItem(priority,content,callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});
    var docClient = new AWS.DynamoDB.DocumentClient();
    console.log('putting item to DynamoDB table');

	var date = new Date();
	var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var requestId = userId + "." + timestamp;
	console.log("requestId:" + requestId);
	
	var params = {
		TableName: "Requests",
		Item: {
			requestId: requestId,
			priority: priority,
			content: content,
			timestamp: timestamp
			}
		};
		
    docClient.put(params, (err, data) => {
        if (err) {
            console.error("Unable to put item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("putItem succeeded:", JSON.stringify(data, null, 2));
			callback();
        }
    });

}
// Nachfrage Funktion
function nachfrage(){
    var nachfragen=["Habe ich dich richtig verstanden?","Ist das so richtig?"];
    var zufall=randomPhrase(nachfrage);
    return zufall; 
}
/*
function createItemDynamoDb(priority,content) {
	var date = new Date();
	var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	var requestId = userId + "." + timestamp
	console.log("requestId:" + requestId);
	var params = {
		TableName: "Requests",
		Item: {
			requestId: requestId,
			priority: priority,
			content: content,
			timestamp: timestamp
			}
		};
	docClient.put(params,function(err,data){
		if(err){
			console.log("An error occured");
			console.error(err);
		}else {
			console.log("Put item sucessfully to DynamoDB.");
			console.log(data);
		}
	});
} 
*/
//sendSMS via SNS
function sendSMS(message){
    var sns = new AWS.SNS();
    sns.publish({
    TopicArn: "arn:aws:sns:eu-west-1:199611815777:Iosa",
    Message: JSON.stringify(message),
    Subject: "HilfeKnopf"
}, function(err, data) {
    if(err) {
        console.error('error publishing to SNS');
    } else {
        console.log('message published to SNS');
    }
});
}


function resolveCanonical(slot){
    //this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
    try{
        var canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    }catch(err){
        console.log(err.message);
        var canonical = slot.value;
    };
    return canonical;
};


function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
