require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context, callback) {
  const chargeParams = {
    currency: 'usd',
    description: `Stripe payment ${event.order_id}`,
    receipt_email: null,
    ...event
  };

  stripe.charges.create(chargeParams, function(err, charge) {
    const status = charge ? charge.status : null;

    callback(err, { status, success: !err });
  });
};
