import express from "express";
import { AddView, addVideo, deleteVideo, getByTag, getVideo, random, search, sub, updatevideo } from "../controllers/video.js"
import { verifytoken } from "../verifyToken.js";


const router = express.Router();


//creating a video

router.post("/", verifytoken, addVideo);
router.put("/:id", verifytoken, updatevideo);
router.delete("/:id", verifytoken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/view/:id", AddView);
router.get("/trend", random);
router.get("/sub", verifytoken, sub);
router.get("/tags", getByTag);
router.get("/search", search);





export default router;
