import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        res.status(200).json("User has been created");

    }
    catch (err) {
        next(err);
    }

}


export const signin = async (req, res, next) => {

    try {
        const requestedUser = await User.findOne({ email: req.body.email });

        if (!requestedUser)
            return next(createError(404, "User not found"));


        const isCorrect = await bcrypt.compareSync(req.body.password, requestedUser.password);

        if (!isCorrect)
            return next(createError(400, "Invalid password"));


        const token = jwt.sign({ id: requestedUser._id }, process.env.JWTKEY)


        const { password, ...others } = requestedUser._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);


    }
    catch (err) {
        next(err);
    }

}