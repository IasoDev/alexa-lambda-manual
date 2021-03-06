/* This code has been generated from your interaction model
/* based on skillinator.io

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

//Authors: Sonja Goehrlich (sonja.goerlich@aol.de), Valentin Schrader (v.schrader@tum.de)

var reprompt;
var welcomeOutput=['Willkommen! Wie kann ich Ihnen helfen?', 'Hallo! Womit kann ich Ihnen behilflich sein', 'Wobei brauchen Sie Hilfe','Sagen Sie mir, mit was ich Ihnen helfen kann']; 
//var welcomeReprompt = "Sage einfach, wobei dir der Pfleger helfen soll";
 // 2. Skill Code =======================================================================================================
"use strict";
var Alexa = require('alexa-sdk');
var AWS = require("aws-sdk");
const AWSregion = 'eu-west-1';
var APP_ID =  "amzn1.ask.skill.f6c652ad-92b8-4c79-a29a-3bd683d582ed";
var userId;
var speechOutput = '';
var anfrage = new Object();
var handlers = {
    'LaunchRequest': function () {
    speechOutput=randomPhrase(welcomeOutput);
    this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = 'Bitte sagen Sie mir, wobei Sie Hilfe benötigen. Ich werde Ihre Anfrage an den Pfleger weiterleiten.';
        reprompt = 'Sie können beispielsweise sagen: Bitte helfe mir auf die Toilette! Oder Sie sagen: Ich kann meinen Fernseher nicht anschalten. Eine weitere möglichkeit ist: Bitte schließe mein Fenster.';
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = ["Drücken Sie den Knopf, wenn Sie wieder Hilfe benötigen.","Wenn Sie Hilfe benötigen, können Sie einfach auf den Knopf drücken.",
                        "Wenn Sie Hilfe vom Pflegepersonal benötigen, betätigen Sie den Knopf und formulieren Ihre Anfrage.","Drücken Sie den Knopf oder sagen Sie meinen Namen Alexa, wenn Sie wieder Hilfe benötigen!"];
        var speechOutputRandomized=randomPhrase(speechOutput);                
        this.emit(':tell', speechOutputRandomized);
    },
    'AMAZON.StopIntent': function () {
        speechOutput = ["Drücken Sie den Knopf, wenn Sie wieder Hilfe benötigen.","Wenn Sie Hilfe benötigen, können Sie einfach auf den Knopf drücken.",
                        "Wenn Sie Hilfe vom Pflegepersonal benötigen, betätigen Sie den Knopf und formulieren Ihre Anfrage.","Drücken Sie den Knopf oder sagen Sie meinen Namen Alexa, wenn Sie wieder Hilfe benötigen!"];
        var speechOutputRandomized=randomPhrase(speechOutput);                
        this.emit(':tell', speechOutputRandomized);
    },
    'AMAZON.YesIntent': function () {
        if (anfrage.inhalt == "Notfall"){
            putDynamoItem(anfrage.prioritaet,anfrage.inhalt, ()=>{
            speechOutput = "Der Notfall wurde an den Pfleger weitergeleitet.";
            this.emit(":tell", speechOutput);
            }); 
        }
        else {
            putDynamoItem(anfrage.prioritaet,anfrage.inhalt, ()=>{
            var input = ["Verstanden.","Ok!"];
            var speechOutput=randomPhrase(input);
            this.emit(":tell", speechOutput);
            }); 
        }
    },
    'AMAZON.NoIntent': function () {
        if (anfrage.inhalt == "Notfall"){
            putDynamoItem("2","körperliche Probleme", ()=>{
            speechOutput = "Dem Pfleger wurde mitgeteilt, dass Sie körperliche Probleme haben.";
            this.emit(":tell", speechOutput);
            }); 
        }
        else {
            var input=["Das tut mir sehr Leid, bitte wiederholen Sie Ihre Anfrage!","Bitte wiederholen Sie Ihre Anfrage!","Ok. Bitte wiederholen Sie Ihr Problem."];
            speechOutput = randomPhrase(input);
            this.emit(":ask", speechOutput, speechOutput);
        }
    },
    'SessionEndedRequest': function () {
        speechOutput = '';
        this.emit(':tell', speechOutput);
    },
    "Dinge_im_Zimmer_schliessen": function () {
        var speechOutput = "";
        var input = ["Ein Pfleger wird sich bald um Ihr Fenster oder Ihre Tür kümmern.","Ein Pfleger wird bald vorbeikommen, um sich um Ihre Tür oder Ihr Fenster zu kümmern."];
        speechOutput=randomPhrase(input);
        speechOutput+=" "+nachfrage();
        anfrage.inhalt="Fenster oder Tür";
        anfrage.prioritaet="3";
        this.emit(":ask",speechOutput);
    },
    "Medikamente": function () {
        var speechOutput = "";
        var input="";
        var MedizinSlotRaw = this.event.request.intent.slots.Medizin.value;
        console.log(MedizinSlot);
        var MedizinSlot = resolveCanonical(this.event.request.intent.slots.Medizin);
        console.log(MedizinSlot);
        if (MedizinSlotRaw == 'hustensaft' || MedizinSlotRaw == 'trank' || MedizinSlotRaw == 'zaubertrank' ) {
            input=["Ein Pfleger wird Ihnen Ihren " +MedizinSlot+ " bringen.","Ihr " +MedizinSlot+ " wird Ihnen bald gebracht.","Der " +MedizinSlot+ " wird gleich gebracht."];    
            speechOutput=randomPhrase(input);
            speechOutput+=" "+nachfrage();
            var capitalized=firstCap(MedizinSlotRaw);
            anfrage.inhalt=capitalized;
            anfrage.prioritaet="2";
            this.emit(":ask",speechOutput);
        }
        else if (MedizinSlotRaw == 'pille' || MedizinSlotRaw == 'tablette' || MedizinSlotRaw == 'arznei' || MedizinSlotRaw == 'ibuprofen'){
            input=["Ein Pfleger wird Ihnen Ihre " +MedizinSlotRaw+ " bringen.","Ihre " +MedizinSlotRaw+ " wird Ihnen bald gebracht.","Die " +MedizinSlotRaw+ " wird gleich gebracht."];    
            speechOutput=randomPhrase(input);
            speechOutput+=" "+nachfrage();
            capitalized=firstCap(MedizinSlotRaw);
            anfrage.inhalt=capitalized;
            anfrage.prioritaet="2";
            this.emit(":ask",speechOutput);
        }
        else if (MedizinSlotRaw == 'schmerzmittel' || MedizinSlotRaw == 'aspirin' || MedizinSlotRaw == 'heilmittel' || MedizinSlotRaw == 'arzneimittel' || MedizinSlotRaw == 'therapeutikum'){
            input=["Ein Pfleger wird Ihnen Ihr " +MedizinSlotRaw+ " bringen.","Ihr " +MedizinSlotRaw+ " wird Ihnen bald gebracht.","Das " +MedizinSlotRaw+ " wird gleich gebracht."];
            speechOutput=randomPhrase(input);
            speechOutput+=" "+nachfrage();
            capitalized=firstCap(MedizinSlotRaw);
            anfrage.inhalt=capitalized;
            anfrage.prioritaet="2";
            this.emit(":ask",speechOutput);
        }
        else {
            input=["Ein Pfleger wird Ihnen Ihre Medikamente bringen.","Ihre Medizin wird Ihnen bald gebracht.","Die Medizin wird gleich gebracht."]; 
            speechOutput=randomPhrase(input);
            speechOutput+=" "+nachfrage();
            anfrage.inhalt="Medizin";
            anfrage.prioritaet="2";
            this.emit(":ask",speechOutput);
        }
        
    },
    "Toilette": function () {
        var speechOutput;
        var input=["Ich habe Ihre Anfrage, dass Sie auf die Toilette müssen, an den Pfleger weitergeleitet.","Der Pfleger weiß Bescheid, dass Sie auf die Toilette müssen.",
                    "Ein Pfleger wird bald da sein, um Ihnen zu helfen, auf die Toilette zu gehen."];
        speechOutput=randomPhrase(input);
        speechOutput+=" "+nachfrage();
        anfrage.inhalt="Toilette";
        anfrage.prioritaet="2";
        this.emit(":ask",speechOutput);
    },
    "Bett": function () {
        var speechOutput;
        var input=["Ich habe Ihre Anfrage, dass Sie das Bett verlassen möchten, an den Pfleger weitergeleitet.", "Der Pfleger kommt gleich, um Ihnen zu helfen, aus dem Bett zu kommen.",
                    "Der Pfleger weiß Bescheid. Er wird bald vorbeikommen, um Ihnen aus dem Bett zu helfen."];
        speechOutput=randomPhrase(input);
        speechOutput+=" "+nachfrage();
        anfrage.inhalt="Bett verlassen";
        anfrage.prioritaet="2";
        this.emit(":ask",speechOutput);
    },
    "Bewegungshilfe": function () {
        var speechOutput;
        var input=["Ich habe Ihre Anfrage, dass Sie Ihre Gehhilfe benötigen weitergeleitet.", "Ihre Gehhilfe wird Ihnen bald gebracht!",
                    "Der Pfleger weiß Bescheid. Er wird Ihnen bald Ihre Bewegungshilfe bringen."];
        speechOutput=randomPhrase(input);
        speechOutput+=" "+nachfrage();
        anfrage.inhalt="Gehhilfe";
        anfrage.prioritaet="3";
        this.emit(":ask",speechOutput);
    },
    "Notfall": function () {
        //sendSMS("Person X in Raum Y hat einen Notfall");
        var speechOutput;
        var input=["Ist es ein Notfall?"];
        speechOutput=randomPhrase(input);
        anfrage.inhalt="Notfall";
        anfrage.prioritaet="1";
        this.emit(":ask",speechOutput);
    },
    
    "Fernseher": function () {
        var speechOutput;
		var input=["Ein Pfleger wird bald hier sein, um sich um den Fernseher zu kümmern.","Bald kommt jemand vorbei, um sich um Ihren Fernseher zu kümmern.",
		            "Hilfe für Ihren Fernseher kommt bald."];
		speechOutput=randomPhrase(input);
        speechOutput+=" "+nachfrage();
        anfrage.inhalt="Fernseher";
        anfrage.prioritaet="3";
        this.emit(":ask",speechOutput);
    },
    
    'Unhandled': function () {
        putDynamoItem("1","Unknown", ()=>{
            speechOutput = "Ich habe leider nicht verstanden, wobei Sie Hilfe benötigen. Der Pfleger weiß jedoch Bescheid, dass Sie Hilfe benötigen.";
            this.emit(":tell", speechOutput);
        });
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
// request function
function nachfrage(){
    var nachfragen=["Habe ich Sie richtig verstanden?","Ist das richtig, wie ich es verstanden habe?"];
    var zufall=randomPhrase(nachfragen);
    return zufall; 
}

// first letter of word capitalized
function firstCap(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
