require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;
const createError = require("http-errors");

const productsRouter = require("./src/routers/products");
const productsController = require("./src/controller/products");
const categoryRouter = require("./src/routers/category");
const transactionRouter = require("./src/routers/transaction");
const transactionController = require("./src/controller/transaction");
const userCustomerController = require("./src/controller/userCustomer");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// products end point
app.use("/products", productsRouter);
app.put("/products/:id", productsController.updateProducts);

// category end point
app.use("/category", categoryRouter);

// transaction end point
// app.use("/category", transactionRouter);
app.get("/transaction", transactionController.getTransaction);
app.post("/transaction", transactionController.insertTransaction);
app.put("/transaction/:id", transactionController.updateTransaction);
app.delete("/transaction/:id", transactionController.deleteTransaction);

// usercustomer end point
// app.use("/usercustomer", transactionRouter);
// app.get("/usercustomer", userCustomerController.getUserCustomer);
// app.post("/", userCustomerController.insertUserCustomer);
// app.put("/usercustomer/:id", userCustomerController.updateUserCustomer);
// app.delete("/usercustomer/:id", userCustomerController.deleteUserCustomer);

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "Internal server Error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: messError,
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
