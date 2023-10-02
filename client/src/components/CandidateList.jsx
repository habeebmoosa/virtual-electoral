import  Axios  from "axios";
import React, { useEffect, useState } from "react";

export const CandidateList = ({electionId}) => {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        console.log(electionId);
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
    }, [electionId]);

    return (
        <>
            <div className="heading">
                <h1>Candidate List</h1>
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
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}