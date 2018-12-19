var express = require('express');
var router = express.Router();

// creating my database for phone contact list and connecting to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contact_db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//define schema
let Schema = mongoose.Schema;

let contactModelSchema = new Schema({
	name: String, 
	phone_number: String
});

//create model
let contactModel = mongoose.model('contactModel', contactModelSchema);

//creating schema field types
let phoneContact = new Schema({
	name:{ 
		type: String
	}, 
	phone_number:{
		type: Number
	}, 
	updated:{ 
		type: Date, default: Date.now
	}
});


/* GET users contact list */

//creating phone contact list
router.post('/', function(req, res, next) {
	let createContact = new contactModel({
		name: req.body.name,
		phone_number: req.body.phone_number
	});
	createContact.save(function (err, result) {
		if (err) return handleError(err);
		console.log(createContact);
		res.send(result);
	})
  
});

//reading phone contact list
router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	contactModel.findById(id,( function(err, result){
	if (err) throw err;
		res.send(result);
	}));
});

//updating phone contact list
router.put('/:id', function(req, res, next) {
	let update_contact = req.params.id;
	contactModel.findOneAndUpdate({_id:update_contact}, req.body,{new:true}, function(err, result){
		if(err)
			res.send(err);
  		res.send(result);
	});
});


//deleting phone contact list
router.delete('/:id', function(req, res, next) {
	let delete_contact = req.params.id;
	contactModel.remove({_id:delete_contact}, function(err, result){
		if (err)
			res.send(err);
 		 res.send('contact deleted successfully');
		});
});

// getting all phone contact list
router.get('/', function(req, res, next){
	contactModel.find((function(err, result){
		if (err) throw err;
		res.send(result);
	}));
});

module.exports = router;