import  express  from "express";
import { createCandidate, deleteCandidate, getCandidate, getCandidates, updateCandidate } from "../controllers/candidateController.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/create/:id",verifyAuth, createCandidate);
router.get("/get/all/:candidateElection",verifyAuth, getCandidates); 
router.get("/get/:id",verifyAuth, getCandidate);
router.put("/update/:id",verifyAuth, updateCandidate);
router.delete("/delete/:id",verifyAuth, deleteCandidate);
export {router as candidateRouter};