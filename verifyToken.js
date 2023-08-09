import jwt from "jsonwebtoken";
import { createError } from "./error.js";


export const verifytoken = (req, res, next) => {
    console.log(req.headers.access_token);
    const token = req.cookies.access_token;

    if (!token)
        return next(createError(401, "You are not authenticated"));


    jwt.verify(token, process.env.JWTKEY, (err, user) => {
        if (err)
            return next(createError(403, "Token is not valid"));

        req.user = user;
        next();
    })
}