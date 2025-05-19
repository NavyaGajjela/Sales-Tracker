//server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
}); 

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use('/api',customerRoutes);
app.use("/api/customers",customerRoutes)
app.use("/api/customers",customerRoutes)

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
