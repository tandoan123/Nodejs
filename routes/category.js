var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const authentication = require('../middle/authentication');

/* 
page: list
http://localhost:3000/danh-muc
method: get
detail: get list products
*/
router.get('/', [authentication.checkLogin], async function (req, res, next) {
  // lấy danh sách sản phẩm
  const categories = await categoryController.getCategories();
  console.log('############################################### get / routes');
  res.render('categories', { categories: categories });
});

/* 
page: list
http://localhost:3000/products
method: post
detail: insert new product
*/
// middleware
router.post('/', [authentication.checkLogin], async function (req, res, next) {
  // xử lý thêm mới sản phẩm
  let { body } = req;
  body = { ...body };
  await categoryController.insert(body);
  console.log('############################################### post / routes categories');
  res.redirect('/danh-muc');
});

/* 
page: list
http://localhost:3000/san-pham/insert
method: post
detail: insert new product
*/
router.get('/insert', [authentication.checkLogin], async function (req, res, next) {
  // hiển thị trang thêm mới
  console.log('############################################### get /insert routes');
  res.render('category_insert');
});

/* 
page: list
http://localhost:3000/san-pham/:id/delete
method: delete
detail: delete product
*/
router.delete('/:id/delete', [authentication.checkLogin], async function (req, res, next) {
  // xử lý xóa sản phẩm
  const { id } = req.params;
  console.log('############################################### delete /:id/delete routes');
  await categoryController.delete(id);
  // trả về dữ liệu dạng json
  res.json({ result: true });

});

/* 
page: list
http://localhost:3000/san-pham/:id/edit
method: get
detail: get one product
*/
router.get('/:id/edit', [authentication.checkLogin], async function (req, res, next) {
  // xử lý lấy 1 sản phẩm
  const { id } = req.params;
  const category = await categoryController.getById(id);
  console.log('############################################### get /:id/edit routes');
  res.render('category', { category: category });
});

/* 
page: list
http://localhost:3000/san-pham/:id/edit
method: put
detail: update one product
*/
router.post('/:id/edit', [authentication.checkLogin], async function (req, res, next) {
  // xử lý cập nhật 1 sản phẩm
  let { params, body } = req;
  body = { ...body };
  await categoryController.update(params.id, body);
  console.log('############################################### post /:id/edit routes');
  res.redirect('/danh-muc');
});

module.exports = router;