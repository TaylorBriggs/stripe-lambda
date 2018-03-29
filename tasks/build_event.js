require('dotenv').load();

const fs = require('fs');
const getToken = require('../lib/token');

function testCard() {
  const today = new Date();
  const nextYear = today.getFullYear() + 1;

  return {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: nextYear,
    cvc: 123
  };
}

module.exports = function(grunt) {
  function logAndExit(err) {
    grunt.log.error(err.message);
    process.exit(1);
  }

  grunt.registerTask('build_event', 'package the app', function() {
    const done = this.async();
    const card = testCard();

    getToken(card, function(err, token) {
      if (err) {
        logAndExit(err);
      }

      const eventJSON = JSON.stringify({
        source: token,
        amount: 2000,
        currency: 'usd',
        description: 'test description',
        receipt_email: process.env.RECEIPT_EMAIL
      }, null, 4);

      fs.writeFile('event.json', eventJSON, 'utf8', function(err) {
        if (err) {
          logAndExit(err);
        }

        done();
      });
    });
  });
};
