var express = require('express');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;
var app = express();

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
	console.log('opened database');

	var kittySchema = mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function() {

		var greeting = this.name 
		? 'Meow name is ' + this.name
		: 'I dont have a name'
		console.log(greeting);
	};

	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({name : 'Silence'});
	console.log(silence.name);

	var fluffy = new Kitten({ name : 'fluffy' });
	fluffy.speak();

	// fluffy.save(function (err, fluffy) {
	// 	if(err) {
	// 		console.log(err);
	// 	} else {
	// 		fluffy.speak();
	// 	}
	// });

	Kitten.find(function(err, kittens){
		if(err) {
			console.log(err);
		} else {
			console.log(kittens)
		}
	});

});

app.listen(1337, '127.0.0.1');

app.get('/', function(req, res){
	res.send('W00t!');
});