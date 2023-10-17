import  Express  from "express"
import postRoutes from "./post_routes.js"

const router = Express.Router()

router.use("/post", postRoutes)

router.all('*', (req, res) => {
	res.status(404).json({
		status: "Not Found",
		payload: null
	})
})

export default router