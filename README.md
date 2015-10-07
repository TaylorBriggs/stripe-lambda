# Stripe Lambda

A Lambda function for charging cards with Stripe.

##  Authentication

Set your Stripe secret key in the `.env` file. Copy the sample to get started:

```
$ cp .env.sample .env
```

Use the script to create your zip archive:

```
$ npm run zip
```

Integrate with the
[AWS API Gateway](http://docs.aws.amazon.com/lambda/latest/dg/gs-amazon-gateway-integration.html)
to access the function via HTTP POST:

```
$ curl -X POST -H "Content-Type: application/json" \
-d '{ "amount": 5000, "token": "STRIPE_CHECKOUT_TOKEN" }' \
YOUR_API_GATEWAY_URL
```
