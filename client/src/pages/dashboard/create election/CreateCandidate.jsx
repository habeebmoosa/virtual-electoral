import  Axios  from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateCandidate = ({isEdit}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [candidateName, setCandidateName] = useState("");
    const [candidateAge, setCandidateAge] = useState("");
    const [candidateDescription, setCandidateDescription] = useState("");
    const [candidateElection, setCandidateElection] = useState("");
    const [candidateId, setCandidateId] = useState("");

    useEffect(() => {
        if (location.state && location.state.candidateElection && !isEdit) {
            const id = location.state.candidateElection;
            setCandidateElection(id);
        }else if(location.state && location.state.election && isEdit){
            const data = location.state.candidate;
            setCandidateName(data.candidateName);
            setCandidateAge(data.candidateAge);
            setCandidateDescription(data.candidateDescription);
            setCandidateId(data._id);
        }
    }, [location.state]);


    const addCandidate = () => {
        Axios.post('http://localhost:3010/api/candidate/create/'+candidateElection, {
            candidateName,
            candidateAge,
            candidateDescription
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((result) => {
            console.log(result.data);
            alert("Candidate Added");
            navigate('/dashboard/myelection');
        }).catch((error) => {
            console.log(error);
        });
    }

    const updateCandidate = () => {
        Axios.put('http://localhost:3010/api/candidate/update/'+candidateId, {
            candidateName,
            candidateAge,
            candidateDescription,
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((result) => {
            console.log(result.data);
            alert("Candidate Updated");
            navigate('/dashboard/myelection');
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="createFormContainer">
            <div className="heading">
                <h1>{isEdit?'Edit Candidate':'Add Candidate'}</h1>
            </div>
            <div className="createForm">
                <div className="formItem">
                    <label htmlFor="candidateName" className="label">Candidate Name</label>
                    <input type="text" name="candidateName" id="candidateName" className="inputBox" required
                    onChange={(e)=>{
                        setCandidateName(e.target.value);
                    }}
                    value={candidateName}/>
                </div>
                <div className="formItem">
                    <label htmlFor="candidateAge" className="label">Candidate Age</label>
                    <input type="number" name="candidateAge" id="candidateAge" className="inputBox" required
                    onChange={(e)=>{
                        setCandidateAge(e.target.value);
                    }}
                    value={candidateAge}/>
                </div>
                <div className="formItem">
                    <label htmlFor="candidateDescription" className="label">Candidate Description</label>
                    <textarea name="candidateDescription" id="candidateDescription" cols="30" rows="10"
                    onChange={(e)=>{
                        setCandidateDescription(e.target.value);
                    }}
                    value={candidateDescription} className="textarea"></textarea>
                </div>
            </div>
            <div>
                <button className="btn" onClick={isEdit?updateCandidate:addCandidate}>{isEdit?
                "Update Candidate":"Add Candidate"}</button>
            </div>
        </div>
    );
}