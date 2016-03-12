var assert = require('assert');
// var path = require('path');
var fs = require('fs');
var Promise = require("es6-promise").Promise;
var EzLoginCsv = require('../libs/main.js');

describe('認証する', function() {

	it("CSVパスを指定して認証する", function(done) {
		this.timeout(5*1000);

		new Promise(function(rlv, rjc){
			var ezLoginCsv = new EzLoginCsv( __dirname+'/data/users.csv' );
			ezLoginCsv.check({'id':'a', 'pw':'b'}, function(result){
				assert.equal(result['id'], 'a');
				assert.equal(result['pw'], 'b');
				assert.equal(result['name'], 'hoge');
				assert.equal(result['prof'], 'fuga');
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			var ezLoginCsv = new EzLoginCsv( __dirname+'/data/users.csv', {'require': ['id']} );
			ezLoginCsv.check({'id':'a b'}, function(result){
				assert.equal(result['id'], 'a b');
				assert.equal(result['pw'], 'c"d,ef');
				assert.equal(result['name'], 'foo');
				assert.equal(result['prof'], 'bar');
				rlv();
			});
		}); })
		.then(function(){
			// console.log(873623456);
			done();
		})
		.catch(function(err) {
			console.error("Failed!", err);
			done();
		})
		;

	});

});

describe('認証に失敗する', function() {

	it("CSVパスを指定して認証する", function(done) {
		this.timeout(5*1000);

		new Promise(function(rlv, rjc){
			var ezLoginCsv = new EzLoginCsv( __dirname+'/data/users.csv' );
			// require の条件に満たないため false
			ezLoginCsv.check({'id':'a'}, function(result){
				assert.strictEqual(result, false);
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			var ezLoginCsv = new EzLoginCsv( __dirname+'/data/users.csv' );
			// レコードが存在しないため false
			ezLoginCsv.check({'id':'undefineduser', 'pw':'1234567890'}, function(result){
				assert.strictEqual(result, false);
				rlv();
			});
		}); })
		.then(function(){
			// console.log(873623456);
			done();
		})
		.catch(function(err) {
			console.error("Failed!", err);
			done();
		})
		;

	});

});
