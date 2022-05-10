const express = require("express");
const router = express.Router();
const productsController = require("../controller/products");

router.get("/", productsController.getProducts).get("/:id", productsController.detailProduct).post("/", productsController.insertProducts).put("/:id", productsController.updateProducts).delete("/:id", productsController.deleteProducts);

module.exports = router;
