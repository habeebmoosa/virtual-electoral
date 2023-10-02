import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CandidateList } from "../../../components/CandidateList";

export const ViewJoinElection = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const [election, setElection] = useState({});

    useEffect(() => {
        if (location.state && location.state.election) {
            const data = location.state.election;
            setElection(data);
        }
    }, [location.state]);

    return (
        <div className="electionContainer">
            <div className="electionDetails">
                <div className="electionHeader">
                    <div className="heading">
                        <h1>Election Details</h1>
                    </div>
                    <button className="btn" onClick={()=>{
                        navigate("/dashboard/joinelection/view/vote", { state: { electionId: election._id } });
                    }}>Vote</button>
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
                        <p>{election.electionVotersCount}</p>
                        {/* <p>{election._id}</p> */}
                    </div>
                </div>
            </div>
            <CandidateList electionId={election._id} />
        </div>
    )
}