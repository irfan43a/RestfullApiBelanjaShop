const pool = require("../config/db");
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const insert = ({ id_category, name, description, stock, price }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO products( id_category, name, description,stock, price)VALUES($1,$2,$3,$4,$5)", [id_category, name, description, stock, price], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
// const update = ({ id, name, description, stock, price, id_category }) => {
//   return new Promise((resolve, reject) => {
//     pool.query("UPDATE products SET name = $1,description = $2, stock = $3, price = $4, id_category = $5 WHERE id = $6", [name, description, stock, price, id_category, id], (err, result) => {
//       if (!err) {
//         resolve(result);
//       } else {
//         reject(new Error(err));
//       }
//     });
//   });
// };

const deleteProducts = (id) => {
  return pool.query("DELETE FROM products WHERE id = $1", [id]);
};

const getProductById = (id) => {
  return pool.query("SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1", id);
};

const countProducts = () => {
  return pool.query("SELECT COUNT (*) AS total FROM products");
};

module.exports = {
  select,
  insert,
  // update,
  deleteProducts,
  countProducts,
  getProductById,
};
