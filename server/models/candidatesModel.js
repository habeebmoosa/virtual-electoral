import mongoose from "mongoose";

const candidatesSchema = mongoose.Schema({
    candidateName:{
        type: String,
        required: true,
    },
    candidateAge:{
        type: Number,
        min: 18,
        required:true
    },
    candidateDescription:{
        type: String,
        default:"No description",
    },
    candidateElection:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "elections",
        required:true,
    },
    candidateTotalVotes:{
        type: Number,
        default: 0,
    },
    candidatePosition:{
        type:Number,
        default:0,
    }
});

export const CandidateModel = mongoose.model("candidates", candidatesSchema);