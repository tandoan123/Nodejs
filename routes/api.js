var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const UserController = require('../components/users/controller');
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');
const productController = require('../components/products/controller');


/* page: login */
// http://localhost:3000/api/dang-ky
// method: post
router.post('/dang-ky', async function (req, res, next) {
    // xử lý login
    // đọc email, password từ body
    const { email, password, confirm_password } = req.body;
    // kiểm tra email, password
    const result = await UserController.register(email, password, confirm_password);

    if (result) {
        res.json({ status: true });
    }
    // nếu sai: vẫn ở trang login
    else {
        res.json({ status: false });
    }
});

/* page: login */
// http://localhost:3000/dang-nhap
// method: post
router.post('/dang-nhap', async function (req, res, next) {
    // xử lý login
    // đọc email, password từ body
    const { email, password } = req.body;
    // kiểm tra email, password
    const result = await UserController.login(email, password);

    if (result) {
        const token = jwt.sign({ _id: result._id, email: result.email }, 'myKey');
        // nếu đúng: chuyển qua trang sản phẩm
        res.json({ status: true, result, token });
    }
    // nếu sai: vẫn ở trang login
    else {
        res.json({ status: false });
    }
});

router.get('/san-pham', [authentication.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const products = await productController.getProducts();
    res.json(products);
});

router.get('/san-pham/:id/chi-tiet',[authentication.checkToken], async function (req, res, next) {
    const {id} = req.params;
    //lay danh sach san pham
    const product = await productController.getById(id);
    res.json(product);
  });

module.exports = router;

// post, put, delete

//req

//query:?abc=123
//params: /:id
//body:

//res
//render: tạo 1 view: hbs/ejs/pug...
//json: API (application programming interface)
