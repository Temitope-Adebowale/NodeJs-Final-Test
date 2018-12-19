const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe('contactList Test', function(){
	it('it should add two numbers correctly', function(done){
		assert.equal(3+4, 7);
		done();
	})

	it('it should add two strings correctly', function(done){
		assert.equal("Temi"+ "tope","Temitope");
		done();
	})

	it('it should add contactList', function(done){
		let contact = {
			name:'Temitope',
			phone_number:'09031922411'
		}
	   request(app)
      .post('/contact/create')
      .send(contact)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.content, 'Temitope');
        done();
	})
})
});