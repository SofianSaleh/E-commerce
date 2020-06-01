const express = require("express");
const cors = require("cors");
const db = require("../database/index");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

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

app.use("/api/welcome", (req, res) => {
  res.send({ world: "hello" });
});

app.listen(PORT, async () => {
  await db.connection();
  console.log(`Listening on port ${PORT}`);
});
