// tầng xử lý
const userService = require('./service');
const bcrypt = require('bcryptjs');

exports.login = async (email, password) => {
    const user = await userService.login(email);
    // if (user && user.password == password) {
    //     return user;
    // }
    // return null;
    console.log(user, email, password);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
        return null;
    return { _id: user._id, email: user.email };
}

exports.register = async (email, password, confirm_password) => {
    if (password != confirm_password) return null;
    let user = await userService.login(email);
    if (user) return null;
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(email, hash);
    console.log(user);
    return { _id: user._id };
}
