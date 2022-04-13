var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const UserController = require('../components/users/controller');
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');

/* page: login */
// http://localhost:3000/dang-nhap
// method: get
router.get('/dang-nhap', [authentication.checkLogin], function (req, res, next) {
  console.log('############################################### get - /dang-nhap index');
  res.render('login');
});

router.get('/thong-ke', function (req, res, next) {
  res.render('statistical');
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
    req.session.token = token;
    // nếu đúng: chuyển qua trang sản phẩm
    res.redirect('/san-pham');
  }
  // nếu sai: vẫn ở trang login
  else {
    res.redirect('/dang-nhap');
  }
});

/* page: logout */
// http://localhost:3000/dang-xuat
// method: get
router.get('/dang-xuat', [authentication.checkLogin], function (req, res, next) {
  req.session.destroy(function (err) {
    // đăng xuất thành công chuyển sang trang đăng nhập
    console.log('############################################### get - /dang-xuat index');
    res.redirect('/dang-nhap');

  });

});


















// http://localhost:3000/canh-day/10/chieu-cao/5
router.get('/canh-day/10/chieu-cao/5', function (req, res, next) {
  const { canhday = 10, chieu_cao = 5 } = req.query;
  const dttg = 0.5 * canhday * chieu_cao;
  //liên kết tới trang index.hbs
  res.render('index', { dttg: dttg });
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
