import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../../css/Election.css';
import Axios from "axios";

export const ViewMyElection = () => {
    const [election, setElection] = useState({});
    const [candidates, setCandidates] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.election) {
            const data = location.state.election;
            setElection(data);
            console.log(election);
        }
    }, [location.state]);

    useEffect(() => {
        console.log(election._id);
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        } else if (election._id) {
            Axios.get('http://localhost:3010/api/candidate/get/all/' + election._id, {
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
    }, [election._id]);


    const deleteCandidate = (id) => {
        Axios.delete('http://localhost:3010/api/candidate/delete/' + id, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then((result) => {
            console.log(result.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="electionContainer">
            <div className="electionDetails">
                <div className="electionHeader">
                    <div className="heading">
                        <h1>Election Details</h1>
                    </div>
                    <button className="btn">Edit</button>
                </div>
                <div className="electionDetailsBody">
                    <div className="electionBodyItem">
                        <h3>Name</h3>
                        <p>{election.electionName}</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Description</h3>
                        <p>{election.electionDescription}</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Result</h3>
                        <p>{election.electionResult}</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Number of voters</h3>
                        <p></p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Created at</h3>
                        <p>{election.createdAt}</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Updated at</h3>
                        <p>{election.updatedAt}</p>
                    </div>
                    <div className="border-line"></div>
                    <div className="electionBodyItem">
                        <h3>Election Joining Key</h3>
                        <p>{election._id}</p>
                    </div>
                </div>
                <div className="electionHeader">
                    <div className="heading">
                        <h1>Election Candidates</h1>
                    </div>
                    <button className="btn" onClick={()=>{
                        navigate('/dashboard/myelection/view/addcandidate', {state: {candidateElection : election._id}});
                    }}>Add Candidate</button>
                </div>
                <div className="electionCandidates">
                    {
                        candidates.map((item) => {
                            return (
                                <div className="electionCandidate">
                                    <div className="electionCandidatesBody">
                                        <div className="electionBodyItem">
                                            <h3>Name</h3>
                                            <p>{item.candidateName}</p>
                                        </div>
                                        <div className="electionBodyItem">
                                            <h3>Age</h3>
                                            <p>{item.candidateAge}</p>
                                        </div>
                                        <div className="electionBodyItem">
                                            <h3>Description</h3>
                                            <p>{item.candidateDescription}</p>
                                        </div>
                                        <div className="electionBodyItem">
                                            <h3>Votes Achived</h3>
                                            <p>{item.candidateTotalVotes}</p>
                                        </div>
                                        <div className="electionBodyItem">
                                            <h3>Position Status</h3>
                                            <p>{item.candidatePosition}</p>
                                        </div>
                                        <div className="electionCandidateFooter">
                                            <button className="btn"
                                            onClick={()=>{
                                                navigate('/dashboard/myelection/view/editcandidate', {state: {candidate : item}});
                                            }}>Edit</button>
                                            <button className="btn" onClick={() => {
                                                deleteCandidate(item._id)
                                                navigate('/dashboard/myelection');
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}