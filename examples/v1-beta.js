// This class definition will eventually be the default
// returned from the package.

require('dotenv').config({path:__dirname + '/.env'});

var API_KEY = process.env.API_KEY || '';
var API_SECRET = process.env.API_SECRET || '';
var FROM_NUMBER = process.env.FROM_NUMBER || '';
var TO_NUMBER = process.env.TO_NUMBER || '';
var APP_ID = process.env.APP_ID || '';
var PRIVATE_KEY = process.env.PRIVATE_KEY || '';

function logToConsole (err,messageResponse) {
  if (err) {
    console.log(err);
  }
  else {
    console.dir(messageResponse);
  }
}

var Nexmo = require('../lib/Nexmo');

var nexmo = new Nexmo({
    apiKey: API_KEY, 
    apiSecret: API_SECRET,
    applicationId: APP_ID,
    privateKey: PRIVATE_KEY
  },
  {debug: true}
);

console.log('Sending Text Message');
nexmo.message.sendSms(
  FROM_NUMBER,
  TO_NUMBER, 
  'testing', 
  logToConsole
);

console.log('Getting Basic Number Insight');
nexmo.numberInsight.get({level:'basic', number: TO_NUMBER}, logToConsole);

console.log('Checking Balance');
nexmo.account.checkBalance(logToConsole);

console.log('Getting Apps List');
nexmo.app.get({}, logToConsole);

var tempAppName = new Date().getTime(); 
console.log('Creating App', tempAppName);

nexmo.app.create(tempAppName, 'voice', 'http://requestb.in/s8yhpcs8', 'http://requestb.in/s8yhpcs8', null, function(err, resp) {
  logToConsole(resp);
  
  console.log('Updating App', tempAppName);
  nexmo.app.update(resp.id, tempAppName, 'voice', 'http://requestb.in/s8yhpcs8', 'http://requestb.in/s8yhpcs8', null, function(err, resp) {
    
    console.log('Deleting App', tempAppName);
    nexmo.app.delete(resp.id, logToConsole);
    
  });
});

nexmo.voice.call({
  to: [{
    type: 'phone',
    number: TO_NUMBER
  }],
  from: {
    type: 'phone',
    number: FROM_NUMBER
  },
  answer_url: ['https://nexmo-community.github.io/ncco-examples/first_call_talk.json']
}, function(err, resp) {
  if(err) {
    console.error(err);
  }
  else {
    console.log(resp)
  }
})
