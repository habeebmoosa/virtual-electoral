import express from 'express'
import { candidateVoteCount, vote, voteCount } from '../controllers/voteController.js';
import { verifyAuth } from '../middlewares/verifyAuth.js';

const router = express.Router();

router.post("/vote",verifyAuth, vote);
router.get("/count/:votedElectionId" , voteCount);
router.get("/count/candidate/:votedElectionId", candidateVoteCount);

export {router as voteRouter};