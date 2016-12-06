var groveSensor = require('jsupm_grove');
var twilio = require('twilio');
// var lcd = require('jsupm_i2clcd');
   // var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

// Create the temperature sensor object using AIO pin 0
var temp = new groveSensor.GroveTemp(0);
console.log(temp.name());
//console.log('LCD:',lcd);
var th1=10, th2=15;


// Read the temperature ten times, printing both the Celsius and
// equivalent Fahrenheit temperature, waiting one second between readings
var i = 0;
var msgFlag1=true;
var msgFlag2=true;
//var waiting = 
function startSensorWatch(socket) {
    'use strict';
    setInterval(function() {
        var celsius = temp.value();
    
        //display.write('hi there');
        //display.setCursor(0,0);
        //display.write('more text');
        var fahrenheit = celsius * 9.0/5.0 + 32.0;
        console.log(celsius + " degrees Celsius, or " +
            Math.round(fahrenheit) + " degrees Fahrenheit");
        i++;
    if(celsius>=5){
        useLcd(celsius, socket);
    }
    
  
        }, 6000);
}

function useLcd(celsius, socket) {
    var lcd = require('./lcd');
    var display = new lcd.LCD(0);

    display.setColor(0, 60, 255);
    display.setCursor(1, 1);
    display.write('hi there');
    display.setCursor(0,0);  
    display.write('more text');
    display.waitForQuiescent()
    .then(function() {
        displayTemperature(display,celsius, socket);
    })
    .fail(function(err) {
        console.log(err);
        display.clearError();
        displayTemperature(display,celsius, socket);
    });
}

function displayTemperature(display,celsius, socket){
    
     display.setCursor(1,1);
        console.log('INLCD->', celsius);
        if(celsius>=5 && celsius <=10 ){
            display.setColor(255,255,0);
        }else if (celsius>th1 && celsius <=th2){
            socket.emit("message", th1);
            if(msgFlag1){
                sendSms();
                
                msgFlag1=false;
            }
            display.setColor(255,140,0);
        }else{
            socket.emit("message", th2);
            if(msgFlag2){
                sendSms();
                
                msgFlag2=false;
            }
            display.setColor(255,0,0);
        }
       display.write(celsius);
 
}

function sendSms(){
    
var TWILIO_ACCOUNT_SID = 'ACfc80a2f08b27f10a9cacaaff46c41120'
var TWILIO_AUTH_TOKEN = 'a0df03a72a0c3d1b743732c8ab109958'
var OUTGOING_NUMBER = '8573170715'
var TWILIO_NUMBER = '3475806394'

var listOfNumbers = ['8572226166','8573170715']
var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
    for(var i =0 ; i<listOfNumbers.length; i++){
        client.sms.messages.create({
            to:listOfNumbers[i],
            from:TWILIO_NUMBER,
            body:'Based on our sensor input , we recommend you to increase the number of open tills to reduce queuing time for customers'
        }, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
        if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('error: ' + error.message);
    }
});}
}

var http = require('http');
var app = http.createServer(function (req, res) {
    'use strict';
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('<h1>Hello world from Intel IoT platform!</h1>');
}).listen(1337);
var io = require('socket.io')(app);

//Attach a 'connection' event handler to the server
io.on('connection', function (socket) {
    'use strict';
    console.log('a user connected');
    //Emits an event along with a message
    socket.emit('connected', 'Welcome');

    //Start watching Sensors connected to Galileo board
    startSensorWatch(socket);

    //Attach a 'disconnect' event handler to the socket
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

var express = require('express')
var app2 = express()
var cors = require('cors')


app2.use(cors())


app2.get('/test', function (req, res) {
    th1 = req.param('th1');
    th2 = req.param('th2');
    console.log(th1,"||||", th2);
    res.send('Threashold set!', th1,";;;;", th2);
})

app2.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})
