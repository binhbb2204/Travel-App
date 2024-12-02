import User from '../Models/User.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        const newUser = new User({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            photo: req.body.photo,
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: 'User successfully created.',
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                gender: newUser.gender,
                photo: newUser.photo,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({
            success: false,
            message: 'Failed to create user.',
            error: error.message,
        });
    }
}

export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found. Please check your email.' });
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password. Please try again.' });
        }

        const { password, role, ...rest } = user._doc

        //create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" })

        //set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        })
            .status(200)
            .json({
                success: true,
                message: 'Login successful! Welcome back!',
                token,
                data: { ...rest },
                role: user.role,
            })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Failed to login. Please try again later.' });
    }
}