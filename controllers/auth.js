import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'

export const signup = async (req, res) => {
    const { name, email, password, number } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (existinguser) {
            return res.status(401).json({ message: "User already Exist." })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await users.create({ name, email, password: hashedPassword, number })
        const token = jwt.sign({ email: newUser.email, number: newUser.number, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: newUser, token })
    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({ message: "User don't Exist." })
        }

        const isPassword = await bcrypt.compare(password, existinguser.password)
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: existinguser, token })
    } catch (error) {
        res.status(500).json("Something went worng...")
    }
}

export const loginOtp = async (req, res) => {
    const { name, number } = req.body;
    console.log("51", req.body);
    try {
        // const existinguser = await users.findOne({ name });
        // if (existinguser) {
        //     return res.status(401).json({ message: "User already Exist." })
        // }

        const newUser = await users.create({ name, number })
        const token = jwt.sign({ name: newUser.name, number: newUser.number, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ result: newUser, token })
    } catch (error) {
        res.status(500).json("All exceptions occured ::controller:56...")
    }
}