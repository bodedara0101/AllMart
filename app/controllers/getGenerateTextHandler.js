import { imageToText} from '../utils/HuggingF.js'

export const getGenerateTextHandler = async(req, res) => {
    console.log(req.file);
    const data = await imageToText(req.file.path);
    console.log(data);
    if(data === null) {
        return res.status(500).json({message: "Internal Server Error"});
    }
    res.status(200).json(data);
}