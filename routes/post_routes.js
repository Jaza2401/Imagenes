import  Express  from "express"
import multer from "multer"
import { postPost, getPosts, updatePost, postPostImg, getPostImg } from "../controller/post_controller.js"

const upload =multer()
const router = Express.Router()

router.post("/", postPost)
router.get("/", getPosts)
router.put("/:id", updatePost)

//html required
router.post("/upload", upload.single('pic'), postPostImg)
router.get("/img/:id", getPostImg)

export default router

