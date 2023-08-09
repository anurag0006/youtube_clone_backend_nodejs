import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js"
import { verifytoken } from "../verifyToken.js";

const router = express.Router();



// update a user
router.put('/:id', verifytoken, update);

router.delete('/:id', verifytoken, deleteUser);

router.get('/find/:id', getUser);

router.put('/sub/:id', verifytoken, subscribe);    //here id  will the id of the channel which youwant to subscribe

router.put('/unsub/:id', verifytoken, unsubscribe);

router.put('/like/:videoId', verifytoken, like);

router.put('/dislike/:videoId', verifytoken, dislike);


export default router;
