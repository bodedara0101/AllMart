import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (filePath) => {
  try {

    console.log(filePath)
    if (!filePath) return null;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const uploadProductsOnCloudinary = async (filePath) => {
  try {

    console.log(filePath)
    if (!filePath) return null;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "Products"
    });

    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
