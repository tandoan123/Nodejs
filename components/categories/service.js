const catagoryModel = require('./model');

exports.getCategories = async () => {
    console.log('############################################### get categories service');
    return await catagoryModel.find();
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    const category = await catagoryModel.findById(id);
    console.log('############################################### getbyid categories service');
    return category;
}

exports.insert = async (category) => {
    const p = new catagoryModel(category);
    console.log('############################################### insert categories service');
    await p.save();
}

exports.delete = async (id) => {
    // data = data.filter(item => item._id != id);
    console.log('############################################### delete categories service');
    await catagoryModel.findByIdAndDelete(id);
}

exports.update = async (id, category) => {
    console.log('############################################### update categories service');
    await catagoryModel.findByIdAndUpdate(id, category);
}
