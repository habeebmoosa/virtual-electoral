import  Axios  from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Vote =()=>{

    const navigate = useNavigate();
    const location = useLocation();

    const [candidates,setCandidates]=useState([]);
    const [electionId,setElectionId]=useState('');   
    const [candidateId,setCandidateId]=useState('');

    useEffect(()=>{
        if (location.state && location.state.electionId) {
            const electionId = location.state.electionId;
            setElectionId(electionId);
        }
    },[location.state]);

    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        } else if (electionId) {
            Axios.get('http://localhost:3010/api/candidate/get/all/' + electionId, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((result) => {
                console.log(result.data);
                setCandidates(result.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    },[electionId])

    const vote = () => {
        Axios.post('http://localhost:3010/api/voting/vote', {
            votedElection: electionId,
            votedCandidate: candidateId
        }, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((result) => {
            console.log(result.data);
            alert(result.data);
            navigate('/dashboard/joinelection');
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <div className="electionContainer">
            <div className="heading">
                <h1>Vote</h1>
            </div>
            <div className="electionDetails">
                <div className="border-line"></div>
                <div className="electionBodyItem">
                    <h3>Choose Candidate</h3>
                    <select name="candidate" id="candidate" className="inputBox"
                    onChange={(e)=>{
                        setCandidateId(e.target.value);
                    }}>
                        <option value="0">Select Candidate</option>
                        {
                            candidates.map((item)=>{
                                return(
                                    <option value={item._id} >{item.candidateName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="border-line"></div>
            </div>
            <button className="btn" onClick={()=>{
                vote();
            }}>Vote</button>
        </div>
    )
}