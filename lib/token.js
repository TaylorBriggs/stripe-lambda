require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
module.exports = function(card, cb){
  stripe.tokens.create({
    card: card
  }, function(err, token) {
    if(err){
      cb(err);
      return;
    }
    cb(null, token.id);
  });

};
