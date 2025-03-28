import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        //file has been uploaded successfully.
        console.log("file has been uploaded successfully.");

        // after uploading the file we have to delete that file from our local storage.
        fs.unlinkSync(localFilePath);

        console.log(response.url);

        return response;

    } catch (error) {
        // Remove the locally saved temparary file as the upload operation got failed.
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export default uploadOnCloudinary;