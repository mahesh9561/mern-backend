const bcrypt = require('bcrypt');
const userSchema = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = "Your jwt token";
exports.registerUser = async (req, res) => {
    const { name, email, mobile, pass } = req.body;
    const handlePassword = await bcrypt.hash(pass, 10);
    const imageUrl = req.file ? `http://localhost:8005/uploads/${req.file.filename}` : '';
    
    // Check if email already exists
    const userEmail = await userSchema.findOne({ email });
    if (userEmail) {
        return res.status(400).json({ message: "Email Already Registered" });
    }

    // Create new user
    const user = new userSchema({
        name,
        email,
        mobile,
        pass: handlePassword,
        imageUrl
    });

    try {
        await user.save();

        const token = jwt.sign(
            { userId: user._id, userEmail: user.email, userMobile: user.mobile },
            JWT_TOKEN,
            { expiresIn: "1hr" }
        );

        // Send success response with status code 201 (Created)
        return res.status(201).json({
            message: "Registration Successful",
            token: token
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Registration Unsuccessful" });
    }
};


exports.loginUser = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Your credentials not correct, Please Register first" });
        }
        const isValidPassword = await bcrypt.compare(pass, user.pass);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Your Password not correct, Please Register first" });
        }
        const token = jwt.sign({ userId: user._id, userEmail: user.email, userMobile: user.mobile }, JWT_TOKEN, { expiresIn: "1hr" });
        return res.status(200).json({ message: "Login Successfull", token });

    } catch (error) {
        return res.status(400).json("Login Failed");
    }
}