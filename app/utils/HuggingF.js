import axios from 'axios';
import fs from 'fs';

const API_URL = "https://dummyurl.com";
const API_KEY = "dummykey";

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