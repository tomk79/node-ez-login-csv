var assert = require('assert');
// var path = require('path');
var fs = require('fs');
var Promise = require("es6-promise").Promise;
var FindInCsv = require('../libs/main.js');

describe('認証する', function() {

	it("CSVパスを指定して認証する", function(done) {
		this.timeout(1*1000);

		new Promise(function(rlv, rjc){
			var findInCsv = new FindInCsv( __dirname+'/data/users.csv' );
			findInCsv.get({'id':'a', 'pw':'b'}, function(result){
				assert.equal(result['id'], 'a');
				assert.equal(result['pw'], 'b');
				assert.equal(result['name'], 'hoge');
				assert.equal(result['prof'], 'fuga');
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			var findInCsv = new FindInCsv( __dirname+'/data/users.csv', {'require': ['id']} );
			findInCsv.get({'id':'a b'}, function(result){
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

	it("MD5ハッシュ化されたパスワードを認証する", function(done) {
		this.timeout(1*1000);
		var findInCsv = new FindInCsv( __dirname+'/data/users_md5.csv', {
			"encrypted":{"pw": "md5"}
		} );

		new Promise(function(rlv, rjc){
			findInCsv.get({'id':'a', 'pw':'b'}, function(result){
				assert.equal(result['id'], 'a');
				assert.equal(result['pw'], undefined);
				assert.equal(result['name'], 'hoge');
				assert.equal(result['prof'], 'fuga');
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			findInCsv.get({'id':'a b'}, function(result){
				assert.equal(result['id'], 'a b');
				assert.equal(result['pw'], undefined);
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

	it("SHA-1ハッシュ化されたパスワードを認証する", function(done) {
		this.timeout(1*1000);
		var findInCsv = new FindInCsv( __dirname+'/data/users_sha1.csv', {
			"encrypted":{"pw": "sha1"}
		} );

		new Promise(function(rlv, rjc){
			findInCsv.get({'id':'a', 'pw':'b'}, function(result){
				assert.equal(result['id'], 'a');
				assert.equal(result['pw'], undefined);
				assert.equal(result['name'], 'hoge');
				assert.equal(result['prof'], 'fuga');
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			findInCsv.get({'id':'a b'}, function(result){
				assert.equal(result['id'], 'a b');
				assert.equal(result['pw'], undefined);
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
		this.timeout(1*1000);

		new Promise(function(rlv, rjc){
			var findInCsv = new FindInCsv( __dirname+'/data/users.csv', {'require': ['id','pw']} );
			// require の条件に満たないため false
			findInCsv.get({'id':'a'}, function(result){
				assert.strictEqual(result, false);
				rlv();
			});
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			var findInCsv = new FindInCsv( __dirname+'/data/users.csv' );
			// レコードが存在しないため false
			findInCsv.get({'id':'undefineduser', 'pw':'1234567890'}, function(result){
				assert.strictEqual(result, false);
				rlv();
			});
		}); })
		.then(function(){
			done();
		})
		.catch(function(err) {
			console.error("Failed!", err);
			done();
		})
		;

	});

});
