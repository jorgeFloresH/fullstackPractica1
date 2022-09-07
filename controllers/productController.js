const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
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

exports.addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
};

exports.getProductById = async (req, res) => {
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

exports.updateProductById = async(req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );
  const foundProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});

  // const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    // const indiceUpdate=products.indexOf(foundProduct);
    // products[indiceUpdate].name = req.body.name;
    // products[indiceUpdate].price = req.body.price;
    // products[indiceUpdate].category = req.body.category;

    // fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
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

exports.deleteProductById = async(req, res) => {
  // const products = JSON.parse(
  //   fs.readFileSync(`${__dirname}/../data/products.json`)
  // );

  const foundProduct = await Product.findByIdAndDelete(req.params.id);
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

