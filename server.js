// Get required modules/docs
var express		= require('express');
var mongojs 	= require('mongojs');
var bodyParser 	= require('body-parser');
var path    	= require('path');

// mLab DB
var distDB = process.env.MONGODB_URI;

// Set connection to DB
var db = mongojs(distDB, ['postcards']);

// Express-app init
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


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
/* Front end dev. still in production */
/*
app.delete('/postcards/:id', function(req, res) {
	var id = req.params.id;
	db.postcards.remove({ _id: mongojs.ObjectId(id) }, function(err, doc) {
		res.json(doc);
	});
});
*/


/* UPDATE document from collection postcards */
/* Front end dev. still in production */
/*
app.put('/postcards/:id', function(req, res) {
	var id = req.params.id;
	db.postcards.findAndModify({ query: {_id: mongojs.ObjectId(id)},
		update: {$set: { reported: true }},
		new: true }, function(err, doc) {
			res.json(doc);
	});
});
*/


var port = process.env.PORT || 3000;
app.listen(port);