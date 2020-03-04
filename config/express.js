var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var localMqttClient = require('../mqtt/mqtt_local') 

module.exports = function(){
    var app = express();
    
    app.set('port',3000);	

    app.set('view engine','ejs');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    load('models',{cwd: 'app'})
            .then('routes')
            .into(app);

    app.get('*',function(req,res){
        res.sendStatus(404);
    });
    
    return app;
};
