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
