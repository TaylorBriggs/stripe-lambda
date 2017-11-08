require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

module.exports = function(card, cb) {
  stripe.tokens.create({ card }, (err, token) => {
    const tokenId = token ? token.id : null;

    cb(err, tokenId);
  });
};
