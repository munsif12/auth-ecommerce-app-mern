const product = require("../models/productModel");
const multer = require("multer");
const fs = require("fs");
const { awsImageUploader } = require("../utility/AWS-image-upload");

/* If you want to storge images in dish you can use the below function but now i am using memory | buffer */

//defined what type of storage u want dish|memory if disk thenn specify the path where to store the file and the filename if you want tot modify
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, `${__dirname}/public/images/`);
//   },
//   filename: (req, file, callback) => {
//     console.log(file);
//     const fileExtentsion = file.mimetype.split("/")[1];
//     console.log(fileExtentsion);
//     callback(null, `image-${req.user._id}-${Date.now()}.${fileExtentsion}`);
//   },
// });
// const imageUpload = multer({ storage: storage }).any();

const storage = multer.memoryStorage();
const imageUpload = multer({ storage }).any();
const getAllProductsController = async (req, res) => {
  console.log(req.query);
  try {
    const queryString = JSON.stringify(req.query); //converted the object into json so we can perform regex on incomming query
    const replacedString = queryString.replace(
      /\b(gt|lt|gte|lte)\b/g, // 1) -> regex is written in between \ \  2) -> \b\b => compare whole word  3) -> g => match whole string (global)
      (match) => `$${match}`
    ); // emabded $ sign with (gt|lt|gte|lte)
    const Query = JSON.parse(replacedString); //again converting it into JS object so we can pass that as query to mongodb
    const allproducts = await product.find(Query);
    if (allproducts) {
      res.status(200).json({
        products: allproducts.length,
        data: allproducts,
      });
    } else {
      res.status(400).json({
        message: "No Product available right now",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const addProduct = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    console.log(req.files);
    const uploadImageToS3 = await awsImageUploader(req.files[0]);
    console.log(uploadImageToS3);
    // pichly authentication middle ware my userdetail add hohe h to waha sa ham userId nikal laga or refrence add krda ga db ma konsa sa user product add krrha h
    // const userId = req.user._id;
    // req.body.artist = userId;
    // const prod = await product.create(req.body);
    // console.log(req.body);
    res.json({ productId: "product added successfully" /* , product: prod */ });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};
const getproductController = async (req, res) => {
  try {
    console.log(req.params);
    const resProduct = await product
      .findById(req.params.id)
      .populate("reviews");
    console.log(resProduct);
    /* .populate({
      path: "artist",
      select: "name email",
    });  */
    //is population ka part ko utha kr hamna query middle ware ma rakh deya wrna hamy ya steps karny party
    /*
    1-> artist id 
    2->fetch artist on base of id 
    3->then merge artist and art data 
    4->then send in response 
    population ya sab kam hamy 2 line ma krka darha h 
     */
    //agr url ma id ka sth underscore na lagaty joka db ma field ha to hamy idr hardcode karna parta like /* findOne({ _id:req.params.id})
    res.status(200).json({ resProduct });
  } catch (error) {
    console.log("get product error");
    console.log(error);
  }
};
const likeProduct = async (req, res) => {
  try {
    //find the product by id
    const { id: productId } = req.params;
    //now get the user id who is liking ids comes from authentication middleware
    const { _id: userId } = req.user;
    //now updatw the product with the id
    const Product = await product.findOneAndUpdate(
      { _id: productId, likes: { $ne: userId } }, // 2 filters taka array ma user 2 ya 2 sa zeyada likes add na kry
      {
        $inc: { likesCount: 1 }, //to increment
        $push: { likes: userId }, // use to push something into aray
      },
      {
        new: true, //new :true means jo updated data data ho woh return krna agr ya na likha to woh db ma updated to krdaga lakin purana data return kary ga
      }
    );
    res.status(200).json({ Product });
  } catch (err) {
    console.log(err);
  }
};
const dislikeProduct = async (req, res) => {
  try {
    //find the product by id
    const { id: productId } = req.params;
    //now get the user id who is liking ids comes from authentication middleware
    const { _id: userId } = req.user;
    //now updatw the product with the id
    const Product = await product.findOneAndUpdate(
      { _id: productId, likes: userId }, // 2 filter -> if array already includes userId
      {
        $inc: { likesCount: -1 }, //to increment
        $pull: { likes: userId }, // use to push something into aray
      },
      {
        new: true, //new :true means jo updated data data ho woh return krna agr ya na likha to woh db ma updated to krdaga lakin purana data return kary ga
      }
    );
    res.status(200).json({ Product });
  } catch (err) {
    console.log(err);
  }
};
const addproductPicture = (req, res) => {};
module.exports = {
  getAllProductsController,
  addProduct,
  getproductController,
  likeProduct,
  dislikeProduct,
  imageUpload,
};
