import { VoteModel } from "../models/voteModel.js";

export const vote = async (req, res) => {
    try {
        const { votedElection, votedCandidate } = req.body;
        const voteBy = req.id;

        if (VoteModel.findOne({ voteBy, votedElection })) {
            res.json("You have already voted for this election");
        } else {
            const vote = new VoteModel({ voteBy, votedElection, votedCandidate });
            await vote.save();
            res.json("Voted successfully");
        }
    } catch (error) {
        res.json(error);
    }
}

export const voteCount = async (req, res) => {
    try {
        const voteCount = await VoteModel.find({ votedElection: req.params.votedElectionId }).count();
        res.json(voteCount);
    } catch (error) {
        res.json(error);
    }
}

export const candidateVoteCount = async (req, res) => {
    try {
        const candidateVoteCount = await VoteModel.find(
            { votedElection: req.params.votedElectionId, votedCandidate: req.body.votedCandidate }
        ).count();
        res.json(candidateVoteCount);

    } catch (error) {
        res.json(error);
    }
}