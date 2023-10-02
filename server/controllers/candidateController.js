import { CandidateModel } from "../models/candidatesModel.js";

export const createCandidate = async(req,res) =>{
    try {
        const {candidateName,candidateAge,candidateDescription} = req.body;

        const newCandidate = new CandidateModel({
            candidateName,
            candidateAge,
            candidateDescription,
            candidateElection : req.params.id
        });

        const saveCandidate = await newCandidate.save();
        res.status(201).json(saveCandidate)
    } catch (error) {
        console.log(error);
    }
}

export const getCandidates = async(req,res)=>{
    try {
        const getCandidates = await CandidateModel.find({candidateElection: req.params.candidateElection});
        res.status(200).json(getCandidates);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const getCandidate = async(req,res)=>{
    try {
        const getCandidate = await CandidateModel.findById(req.params.id);
        res.status(200).json(getCandidate);
    } catch (error) {
        res.status(401).json(error);
    }
}

export const updateCandidate = async(req,res) =>{
    try {
        const updateCandidate = await CandidateModel.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        );

        res.status(200).json(updateCandidate);
    } catch (error) {
        res.json(error);
    }
}

export const deleteCandidate = async (req,res) =>{
    try {
        await CandidateModel.findByIdAndDelete(req.params.id);
        res.json("Candidate deleted successfully");
    } catch (error) {
        res.json(error);
    }
}