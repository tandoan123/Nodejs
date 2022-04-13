const userModel = require('./model');



// tầng gọi database
exports.login = async (email) => {
    // select id, username, password from users where username = ''
    const user = await userModel.findOne({email:email}, 'id email password');
    return user;
}

exports.register = async (email, password) => {
    // select id, username, password from users where username = ''
    const user = new userModel({email, password});
    return await user.save();
}





































// mảng dữ liệu user
// var data = [
//     { id: 1, email: 'admin@gmail.com', password: '123', name: 'An Tran' }
// ]