const { json } = require("express/lib/response");
const createError = require("http-errors");
const pool = require("../config/db");
const categoryModel = require("../models/category");
const commonHelper = require("../helper/common");

exports.getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const result = await categoryModel.select({ offset, limit });

    // pagination
    const {
      rows: [count],
    } = await categoryModel.countCategory();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    // commonHelper.response(res, result, 200, "data berhasil di dapat");
    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      },
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};
exports.insertCategory = (req, res, next) => {
  const { id, name } = req.body;
  const data = { id, name };
  categoryModel
    .insert(data)
    .then(() => {
      res.status(201).json({
        data,
        message: "data berhasil di tambahkan",
      });
    })
    .catch((err) => {
      console.log(err);
      next(new createError.InternalServerError());
    });
};
exports.updateCategory = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;

  pool.query("UPDATE category SET name = $1 WHERE id= $2", [name, id], (err, result) => {
    if (!err) {
      res.json({
        message: "data berhasil dirubah",
      });
    } else {
      res.status(500).json({
        message: "internal server error",
      });
    }
  });
};
exports.deleteCategory = (req, res, next) => {
  const id = req.params.id;

  categoryModel
    .deleteCategory(id)
    .then((result) => {
      res.json({
        message: "data berhasil di hapus",
      });
    })
    .catch((err) => {
      console.log(err);
      next(new createError.InternalServerError());
    });
};
