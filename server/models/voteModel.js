import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    voteBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required:true,
    },
    votedElection:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"elections",
        required:true,
    },
    votedCandidate:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"candidates",
        required:true,
    }
},{timestamps: true});

export const VoteModel = mongoose.model("votes",voteSchema);