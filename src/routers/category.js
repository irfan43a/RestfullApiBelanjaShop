const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

router.get("/", categoryController.getCategory).post("/", categoryController.insertCategory).put("/:id", categoryController.updateCategory).delete("/:id", categoryController.deleteCategory);

module.exports = router;
