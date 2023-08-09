import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            // Check if req.body is not empty before updating
            if (!req.body) {
                return next(createError(400, "Request body is empty"));
            }

            // Use { new: true } option to get the updated document
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });

            // Check if the user exists and was updated successfully
            if (!updatedUser) {
                return next(createError(404, "User not found"));
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can only update your own account"));
    }
};



export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        }

        catch (err) {
            next(err);

        }
    }

    else {
        return next(createError(403, "You can only delete your own account"));

    }


}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).josn(user);
    }
    catch (err) {
        next(err);
    }

}
export const subscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })

        await User.findById(req.params.id, {
            $inc: { subscribers: 1 },
        })
        res.status(200).json("Subscription successful");
    }
    catch (err) {
        next(err);
    }


}
export const unsubscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })

        await User.findById(req.params.id, {
            $inf: { subscribers: -1 },
        })
        res.status(200).json("Unsubscription successful");
    }
    catch (err) {
        next(err);
    }

}
export const like = async (req, res) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        })
        res.status(200).json("The video has been likes");
    }

    catch (err) {
        next(err);
    }


}
export const dislike = async (req, res) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been likes");
    }

    catch (err) {
        next(err);
    }
}