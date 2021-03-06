var Request = require("request-promise");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var serverPort = process.env.PORT || 4000;
var cfenv = require("cfenv");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function MaakderWatMooisVan(ObjectMongoCount, Class, error) {
    if (error) {
        return console.dir(error);
    }
    var jsondata = JSON.parse(ObjectMongoCount);
    newBody = jsondata.filter(function (o) {
        return (o.class === Class)
    })
    Response.Count = newBody.length;
}
//kijken of het werkt
async function Controller(Obj, Class, res) {
    await Request.post({
        "headers": { "content-type": "application/json" },
        "url": mongoURL,
        "body": JSON.stringify(Obj)
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.log("body to be added to Response.Image "  + body)
        Response.Image = JSON.parse(body);
        
    })

    let CountObject = await Request.get(mongoURL);
    await MaakderWatMooisVan(CountObject, Class);
    await res.send(JSON.stringify(Response));
}

app.post('/post', function (req, res) {
    var mongo = req.body;
    var mongoclass = req.body.class
    Response = new Object;
    Response.Image = Object;
    Response.Count = Number;
    Response = Controller(mongo, mongoclass, res);
});

var appEnv = cfenv.getAppEnv(); //build URL after being assigned a Route.
const Mongo = "https://Mongo-Server-watson-";
const Domein = ".eu-gb.mybluemix.net";
const path  = "/api/Images"
var Toolchain = appEnv.app.application_name.split("-")[3];

if (Toolchain == undefined) {
    var mongoURL = Mongo.concat(Domein, path);
    console.log('undefined' + mongoURL)
} else {
    var mongoURL = Mongo.concat(Toolchain, Domein, path);
    console.log('not undefined' + mongoURL)
}
app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
