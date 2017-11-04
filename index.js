require('dotenv').load();
var qs = require('qs');

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context, callback) {
  console.log("event: \n" + JSON.stringify(event, null, 4));
  var data = qs.parse(event.body);
  console.log("body: \n" + JSON.stringify(data, null, 4));

  var customer = stripe.customers.create({
    source: data.stripeToken,
    email: data.stripeEmail,
    description: "Customer for " + data.stripeEmail,
    plan: 'littleFriendIG500'
  }, function(err, charge) {
    if (err && err.type === 'card_error') {
      context.fail(new Error(err.message));
    } else if(err){
      context.fail(err);
    } else {
      context.succeed({ status: charge.status, success : true });
    }
  });
  var response = {
    statusCode: 301,
    headers: {
      "Location" : "http://littlefriend.co/success"
    },
    body: null
  };
  callback(null, response);
};
