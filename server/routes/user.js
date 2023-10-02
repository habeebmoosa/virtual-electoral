import  express  from "express";
import { deleteUser, getUser, listUser, updateUser } from "../controllers/userController.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.put("/update" ,verifyAuth, updateUser);
router.delete("/delete/:id" , deleteUser);
router.get("/list", listUser);
router.get("/get",verifyAuth, getUser);

export {router as userRouter}