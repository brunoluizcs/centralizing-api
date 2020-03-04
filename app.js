var http = require('http');
var express = require('express');
var app = require('./config/express')();

   
app.listen(app.get('port'), function() {
    console.log('Servidor rodando na porta:' + app.get('port'));
});
