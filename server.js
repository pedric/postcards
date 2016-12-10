var express= require("express");
var app = express();
var mongojs = require('mongojs');
var db = mongojs('postcard', ['postcards']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/postcards', function(req, res) {
	console.log("I recieved a GET req.");

	db.postcards.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});

});

app.post('/postcards', function(req, res) {
	console.log(req.body);
	db.postcards.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/postcards/:id', function(req, res) {

	var id = req.params.id;
	console.log(id);
	db.postcards.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
		res.json(doc);
	});
});

app.get('/postcards/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.postcards.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
		res.json(doc);
	});
});

app.put('/postcards/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.postcards.findAndModify({ query: {_id: mongojs.ObjectId(id)},
		update: {$set: { name: req.body.name, email: req.body.email, number: req.body.number }},
		new: true }, function(err, doc) {
			res.json(doc);
	});
});

app.listen(3000);
console.log("Server listens on port 3000");



