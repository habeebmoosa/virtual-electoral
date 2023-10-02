import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const JoinElection = () => {
    const [joinKey, setJoinKey] = useState("")
    const navigate = useNavigate();

    const joinElection = () => {
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        }
        else if (joinKey === "") {
            alert("Please fill all the details");
            return;
        } else {
            Axios.put(`http://localhost:3010/api/election/join/${joinKey}`, {}, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((result) => {
                console.log(result.data);
                alert("Election Joined");
                navigate('/dashboard/joinelection');
            }).catch((error) => {
                alert("You have already joined this election or key is incorrect");
                console.log(error);
            }
            );
        }
    }

    return (
        <div className="electionContainer">
            <div className="heading">
                <h1>Join Election</h1>
            </div>
            <div className="electionDetailsBody">
                <div className="electionBodyItem">
                    <label htmlFor="joinkey" className="label">Enter Election Joining Key</label>
                    <input type="text" name="joinkey" id="joinkey" className="inputBox"
                        onChange={(e) => {
                            setJoinKey(e.target.value);
                        }} />
                </div>
            </div>
            <button className="btn" onClick={joinElection}>Join Election</button>
        </div>
    )
}