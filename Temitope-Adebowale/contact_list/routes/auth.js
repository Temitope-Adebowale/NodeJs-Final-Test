var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

// creating my database for signup and connecting to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/signup_db');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//creating schema field types
var userSchema = new mongoose.Schema({
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  Cpassword: {
    type: String
  }
});

var User = mongoose.model('users', userSchema);

router.post('/signup', function(req, res, next) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var Cpassword = req.body.Cpassword;

	var newuser = new User();
	newuser.email = email;
	newuser.username = username;
	newuser.password = password;
	newuser.Cpassword = Cpassword;
	newuser.save(function(err, savedUser) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		console.log(savedUser);
		res.send("Signup Successful");
	});
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username, password: password}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		if(!user) {
			return res.status(404).send();
		}
		req.session.user = user;
		res.send('Login Successful');
	});
}); 

router.get('/dashboard', function(req, res) {
	if(!req.session.user) {
		return res.status(401).send();
	}
	return res.status(200).send("Welcome")
})

module.exports = router;

