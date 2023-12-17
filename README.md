# restoresa-backend

### Stripe payment handling backend

This (for now) only for in local environment with the code of:

export STRIPE_TOKEN=<token>

``npm install``

``node server.js``


This can also be tested with **Postman**

The main backend' idea is to get payment intent based on the given price. The **Stripe** (based on the configuration on the website) gives possible payment
methods, client' secret code and much mode.

On later sprints:

- Create docker image
- Upload into cloud for 24/7 payment service
