const userModel = require("../models/userModel");

const login = async (req, res) =>{
const {email, password} = req.body;
try{
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({success: false, message: "User not found"});
    }
    if(user.password !== password){
        return res.status(401).json({success: false, message: "Invalid password"});
    }
    return res.status(200).json({success: true, message: "Login successful", user});
}catch(err){
    return res.status(500).json({success: false, message: err.message});
}
} ;

const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists. Please login instead."
            });
        }

        const newUser = userModel.create({
            name,
            email,
            password,
            phone,
            address
        });


        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
    

module.exports = {
    login,
    register
}