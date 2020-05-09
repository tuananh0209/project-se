const db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')

module.exports.products = function (req, res) {
     var user = db.get('users').find({
        id: req.signedCookies.userId
     }).value();
     if (!user) res.locals.user = user;
    
    var product = db.get("products").value();
    var perPage = parseInt(req.query.page) || 1;
    var size = product.length + 1;
    var begin = (perPage - 1) * 16;
    var end = (perPage - 1) * 16 + 16;
    console.log(size);
    res.render('products/products',{
        product : product.slice(begin , end),
        page : size / 16,
        perPage : perPage
    });
}

module.exports.search = function (req, res) {
    var name = req.query.q;
    var productsMatch = db.get('products').value().filter(function (value) {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    var perPage = parseInt(req.query.page) || 1;
    var size = productsMatch.length + 1;
    var begin = (perPage - 1) * 16;
    var end = (perPage - 1) * 16 + 16;
    console.log(size);
    res.render('products/products', {
        product: productsMatch.slice(begin, end),
        page: size / 16,
        perPage: perPage,
        inputs: name
    });
  
};