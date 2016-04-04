
var getToken = require("../lib/token")
var fs = require("fs");
require('dotenv').load();

module.exports = function(grunt) {
  grunt.registerTask('build_event', 'package the app', function() {

    var done = this.async();

    getToken({
      "number": "4242424242424242",
      "exp_month": 12,
      "exp_year": 2017,
      "cvc": "123"
    },function(err, token){
      fs.writeFile("event.json", JSON.stringify({
          "source" : token,
          "amount" : 2000,
          "currency" : "usd",
          "description" : "test description",
          "receipt_email" : process.env.RECEIPT_EMAIL
      }, null, 4) , 'utf8', function(err){
        done();
      });
    })


  });
};
