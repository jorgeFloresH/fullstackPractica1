const mongoose= require("mongoose");
const app = require("./app");
const Product= require("./models/Product");

const port = process.env.PORT;
mongoose.connect(process.env.DATABASE,{}).then((con)=>{
  console.log("Coneccted to mongo.");
  // const p=new Product({
  //     productName:"product 2",
  //     price:10
  // });
  // p.save().then(()=>{
  //   console.log("saved product");
  // });
});
app.listen(port,"127.0.0.1", () => {
  console.log(`App running on port ${port}`);
});
// app.listen(port,"127.0.0.1", () => {
//   console.log(`App running on port ${port}`);
// });