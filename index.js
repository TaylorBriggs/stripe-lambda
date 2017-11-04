require('dotenv').load();
var qs = require('qs');

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context) {
  console.log("event: \n" + JSON.stringify(event, null, 4));
  var data = qs.parse(event.body);
  console.log("body: \n" + JSON.stringify(data, null, 4));
  stripe.charges.create({
    amount:        data.amount,
    source:        data.source,
    currency:      data.currency || 'usd',
    description:   data.description || 'Stripe payment '+data.order_id,
    receipt_email: data.receipt_email || null
  }, function(err, charge) {
    if (err && err.type === 'card_error') {
      context.fail(new Error(err.message));
    } else if(err){
      context.fail(err);
    } else {
      context.succeed({ status: charge.status, success : true });
    }
  });
};
