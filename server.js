const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid");
const dotenv = require("dotenv");
const { async } = require("q");

const app = express();
app.use(bodyParser.json());
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});

// Data table model in DB
const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: {
      type: String,
      default() {
        return uuid.v4();
      },
    },
    image: String,
    title: String,
    description: String,
    availableSizes: [String],
    price: Number,
  })
);

// Ask the Product data from DB
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// Create Product data in to the DB
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

//Delete Product data from DB
app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default() {
          return uuid.v4();
        },
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is required." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

app.delete("/api/orders:id", async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  res.send(deletedOrder);
});

const port = process.env.Port || 4000;
app.listen(port, () => console.log("server at http://localhost:4000"));
