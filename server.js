var express		= require('express');
var mongojs 	= require('mongojs');
var bodyParser 	= require('body-parser');
var path    	= require('path');
var myDB		= require('./config.js');

var dbUrl = myDB.dbUrl;

var db = mongojs(dbUrl, ['postcards']);
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.all('/*', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});

/* GET all documents from collection postcards */
app.get('/postcards', function(req, res) {

	db.postcards.find(function(err, docs) {
		res.json(docs);
	});
});


/* GET specific document based on _id */
app.get('/postcards/:id', function(req, res) {

	var id = req.params.id;

	db.postcards.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {

		res.json(doc);
	});
});


/* POST new document to collection postcards */
app.post('/postcards', function(req, res) {

	db.postcards.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});


/* DELETE document from collection postcards */
app.delete('/postcards/:id', function(req, res) {

	var id = req.params.id;

	db.postcards.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
		res.json(doc);
	});
});


/* UPDATE */
app.put('/postcards/:id', function(req, res) {

	var id = req.params.id;

	db.postcards.findAndModify({ query: {_id: mongojs.ObjectId(id)},
		update: {$set: { name: req.body.name, email: req.body.email, number: req.body.number }},
		new: true }, function(err, doc) {
			res.json(doc);
	});
});


var port = Number(process.env.port || 3000);
app.listen(port);
console.log('App running on ' + port);

