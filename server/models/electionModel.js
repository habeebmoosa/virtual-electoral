import mongoose from "mongoose";

const electionSchema = mongoose.Schema({
    electionName:{
        type: String,
        required: true,
    },
    electionDescription:{
        type: String,
        required: true,
    },
    electionVoters:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
    electionResult:{
        type: String,
        default: "No results"
    },
    electionCreatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
},{timestamps: true});

export const ElectionModel = mongoose.model("elections",electionSchema);