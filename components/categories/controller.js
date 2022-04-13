const async = require('hbs/lib/async');
const categoryService = require('./service');

exports.getCategories = async() => {
    let data = await categoryService.getCategories();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
        }
        return item;
    });
    console.log('############################################### get categories controller');
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let category = await categoryService.getById(id);
    category = {
        _id: category._id,
        name: category.name,
        description: category.description
    }
    console.log('############################################### getbyid categories controller');
    return category;
}

exports.insert = async (body) => {
    console.log('############################################### insert categories controller');
    await categoryService.insert(body);
}

exports.delete = async (id) => {
    console.log('############################################### delete categories controller');
    await categoryService.delete(id);
}

exports.update = async (id, category) => {
    console.log('############################################### update categories controller');
    await categoryService.update(id, category);
}
