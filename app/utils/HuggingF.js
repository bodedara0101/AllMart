import axios from 'axios';
import fs from 'fs';

const API_URL = "https://router.huggingface.co/hf-inference/models/Salesforce/blip-image-captioning-base";
const API_KEY = "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";

export async function imageToText(imagePath) {
    const image = fs.readFileSync(imagePath); // Read image file
    try {
        const response = await axios.post(
            API_URL,
            image,
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data[0];
    } catch (error) {
        console.error(error); 
        return null;
    }
}