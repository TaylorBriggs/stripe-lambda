require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context) {
  stripe.charges.create({
    amount:        event.amount,
    source:        event.source,
    currency:      'usd',
    description:   'donation',
    receipt_email: event.receipt_email || null
  }, function(err, charge) {
    if (err && err.type === 'card_error') {
      context.fail(new Error(err.message));
    } else {
      context.succeed({ status: charge.status });
    }
  });
};
