import express from "express";
import { createElection, deleteElection, getElection, getJoinedElection, joinElection, listElection, updateElection } from "../controllers/electionController.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

const router = express.Router();

router.post("/create", verifyAuth, createElection);
router.put("/update/:id", verifyAuth, updateElection);
router.put("/join/:id", verifyAuth, joinElection);
router.delete("/delete/:id", verifyAuth, deleteElection);
router.get("/list", verifyAuth, listElection);
router.get("/get", verifyAuth, getElection);
router.get("/getjoin", verifyAuth, getJoinedElection);

export { router as electionRouter }
