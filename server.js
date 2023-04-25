const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MxUGcAW162dDEIYuzNESml3i1c4qGygjXDEopV95QmENcEHxalh73gAapAPwEWqYnt3B2WZ53ASX9aQKiUK4wg300jbpflJkR"
);
const port = process.env.PORT || 5040;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Serer is running on port: ", port);
});

app.post("/api/get-payment-intent", async (req, res) => {
  const price = req.body.price;
  console.log(Number(req.body.price));
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (price * 100).toFixed(0),
    currency: "eur",
  });
  res.send({ client_secret: paymentIntent.client_secret });
});

// const getPaymentLink = async () => {
//   const price = await stripe.prices.create({
//     currency: "usd",
//     unit_amount: 1000,
//     product: "prod_NiwTmyQ0DztmMt",
//   });
//   console.log(price);

//   const paymentLink = await stripe.paymentLinks.create({
//     line_items: [{ price: "price_1MxUarAW162dDEIYGr92E8PZ", quantity: 1 }],
//   });

//   console.log(paymentLink);
// };

// const getPaymentIntent = async () => {};

// getPaymentIntent();

// getPaymentLink();
// stripe.products.create({
//     name: 'Starter Subscription',
//     description: '$12/Month subscription',
// }).then(product => {
//     stripe.prices.create({
//       unit_amount: 1200,
//       currency: 'usd',
//       recurring: {
//         interval: 'month',
//       },
//       product: product.id,
//     }).then(price => {
//       console.log('Success! Here is your starter subscription product id: ' + product.id);
//       console.log('Success! Here is your premium subscription price id: ' + price.id);
//     });
//   });

// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const cors = require("cors");
// const compression = require("compression");
// const enforce = require("express-sslify");

// if (process.env.NODE_ENV !== "production") require("dotenv").config();

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const app = express();
// const port = process.env.PORT || 5050;

// app.use(compression());
// app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(enforce.HTTPS({ trustProtoHeader: true }));

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

// app.listen(port, (error) => {
//   if (error) throw error;
//   console.log("Serer is running on port: ", port);
// });

// app.get("/service-worker.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
// });

// app.post("/payment", (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: "usd",
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) res.status(500).send({ error: stripeErr });
//     res.status(200).send({ success: stripeRes });
//   });
// });
