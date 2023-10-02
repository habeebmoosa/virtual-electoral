import { ElectionModel } from "../models/electionModel.js";
import { errorHandler } from "../utils/error.js";

export const createElection = async (req, res) => {
    try {
        const {
            electionName,
            electionDescription
        } = req.body;

        const newElection = new ElectionModel({
            electionName,
            electionDescription,
            electionCreatedBy: req.id,
        });

        const saveElection = await newElection.save();
        res.status(201).json(saveElection);
    } catch (error) {
        res.status(401).json({ err: error })
    }
}

export const updateElection = async (req, res) => {
    try {
        const updateElection = await ElectionModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateElection);
    } catch (error) {
        res.json(error)
    }
}

export const deleteElection = async (req, res) => {
    try {
        await ElectionModel.findByIdAndDelete(req.params.id);
        res.json("Election deleted successfully");
    } catch (error) {
        res.json(error);
    }
}

export const listElection = async (req, res) => {
    try {
        const getElections = await ElectionModel.find({ electionCreatedBy: req.id });
        res.json(getElections);
    } catch (error) {
        res.json(error)
    }
}

export const getElection = async (req, res) => {
    try {
        const getElection = await ElectionModel.findById({ _id: req.id });
        res.json(getElection);
    } catch (error) {
        res.json(error)
    }
}

export const joinElection = async (req, res, next) => {
    try {
        if(ElectionModel.electionVoters.includes(req.id)){
            next(errorHandler(400, "You have already joined the election"))
        }
        else{
            await ElectionModel.findByIdAndUpdate(
                req.params.id,
                { $push: { electionVoters: req.id } },
                { new: true }
            );
            res.status(200).json({ message: "You have joined the election" });
        }
    } catch (error) {
        next(error);
    }
}

export const getJoinedElection = async (req, res) => {
    try {
        const elections = await ElectionModel.find({ electionVoters: req.id });

        const electionData = await elections.map((election) => ({
            _id: election._id,
            electionName: election.electionName,
            electionDescription: election.electionDescription,
            electionResult: election.electionResult,
            electionVotersCount: election.electionVoters.length,
        }));

        res.json(electionData);
    } catch (error) {
        res.json(error)
    }
}