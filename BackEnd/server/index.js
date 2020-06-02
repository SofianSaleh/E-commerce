require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("../database/index");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders:
      "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  })
);

app.use(express.json());

//Routes
app.use(`/api/user`, require(`./routes/user`));
app.use(`/api/product`, require(`./routes/product`));
app.use(`/api/order`, require(`./routes/order`));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
