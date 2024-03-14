import User from "../model/UserModel.js";
import bcrypt from 'bcrypt';


// Register:
export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next('Please fill all the fields...');
        }
  
        const emailcheck = await User.findOne({ email });
        if (emailcheck) {
            return next('Email Already Registered, Please Login...');
        }

        const Hashpassword = await bcrypt.hash(password, 10);

        const userData = await User.create({
            name,
            email,
            password: Hashpassword,
        })

        res.status(201).json({
            message: 'User Registered Successfully, Please Login...', userData
        })
    }
    catch (error) {
        return next(error.message || 'Error In Register API...');
    }
}

// Login:
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next('Please fill User Email and Password...');
        }

        const emailcheck = await User.findOne({ email });
        if (!emailcheck) {
            return next('Invalid User Email...');
        }

        const isMatch = await bcrypt.compare(password, emailcheck.password);
        if (!isMatch) {
            return next('Invalid User Password...');
        }

        const Accesstoken = emailcheck.createJWT();

        res.cookie("accessToken", Accesstoken, { httpOnly: false })
            .status(200)
            .json({ message: 'User Login Successfully...', Accesstoken: Accesstoken, emailcheck });
    }
    catch (error) {
        return next('User Data Not Found...');
    }
}

