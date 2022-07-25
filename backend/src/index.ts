import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import typeRoutes from "./routes/type.route";
import productRoutes from "./routes/product.route";
import offerRoutes from "./routes/offer.route";

// set express
const app = express();

// read json
app.use(express.json());

// enviroment variables config
dotenv.config();

// database connection
connectDB();

// routing
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/products", productRoutes);

// port
const PORT = process.env.PORT || 5000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Set connection in port ${PORT}`);
});
