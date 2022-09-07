const fs = require("fs");
const Product= require("../models/Product");
//tiene q ser funcion asincrona
exports.getAllProducts = async(req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );

  const products = await Product.find();
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async(req, res) => {

  const newProduct = await Product.create(req.body);
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );
  // products.push(req.body);
  // console.log(products);
  // fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
};

exports.getProductById = async(req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );

  // const foundProduct = products.find((p) => p.id == req.params.id);
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {

    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    const indiceUpdate=products.indexOf(foundProduct);
    products[indiceUpdate].name = req.body.name;
    products[indiceUpdate].price = req.body.price;
    products[indiceUpdate].category = req.body.category;

    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(201).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    const indiceDelete=products.indexOf(foundProduct);
    products.splice(indiceDelete,1);
    //console.log(indiceDelete,1);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
    res.status(200).json({
      status: "success",
      data: {
        product: products,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

