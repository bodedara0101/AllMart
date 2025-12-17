import { User } from "../models/users.model.js"; // Assuming you have a User model

const getusersHandler = async(req,res)=>{
    const date = new Date();
    const start = date.getMilliseconds();
    const users = await User.findAll();
    const end = date.getMilliseconds();
    const duration = end - start;
    console.log("start", start);
    console.log("end", end);
    console.log(`Signup completed in ${duration} seconds`);
    console.log(users);
    res.status(200).json(users);

}

export default getusersHandler;