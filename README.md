# Stripe Lambda

A Lambda function for charging cards with Stripe. Only intended for use with the [Stripe Checkout](https://stripe.com/checkout) widget.

##  Authentication

Set your Stripe secret key in the `.env` file. Copy the sample to get started:

```
$ cp .env.sample .env
```

Use the script to create your zip archive:

```
$ grunt run
```

Deploy it on AWS

```
$ grunt deploy
```
Integrate with the
[AWS API Gateway](http://docs.aws.amazon.com/lambda/latest/dg/gs-amazon-gateway-integration.html)
to access the function via HTTP POST:

```
$ curl -X POST -H "Content-Type: application/json" \
-d '{ "amount": 5000, "source": "STRIPE_SOURCE" }' \
YOUR_API_GATEWAY_URL
```

There is also an optional `receipt_email` param.
See the [Stripe docs](https://stripe.com/docs/api#create_charge) for additional
details on creating a charge.
