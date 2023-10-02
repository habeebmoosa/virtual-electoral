import React, { useState } from "react";
import '../../../css/Election.css';
import { useNavigate } from "react-router-dom";
import  Axios  from "axios";

export const CreateElection = () => {

    const navigate = useNavigate();

    const [electionName, setElectionName] = useState("");
    const [electionDescription, setElectionDescription] = useState("");

    const createElection = () => {
        if (electionName === "" || electionDescription === "") {
            alert("Please fill all the details");
            return;
        } else {
            Axios.post('http://localhost:3010/api/election/create', {
                electionName,
                electionDescription
            }, {
                headers: {
                    authorization: localStorage.getItem("token")

                }
            }).then((result) => {
                console.log(result.data);
                alert("Election Created");
                navigate('/dashboard/myelection');
            }).catch((error) => {
                console.log(error);
                alert(error.response.data.message)
            }
            );
        }
    }

    return (
        <div className="electionContainer">
            <div className="heading">
                <h1>Create Election</h1>
            </div>
            <div className="electionDetailsBody">
                <div className="electionBodyItem">
                    <label htmlFor="electionName" className="label">Election Name</label>
                    <input type="text" name="electionName" id="electionName" className="inputBox" 
                    onChange={(e)=>{
                        setElectionName(e.target.value);
                    }}/>
                </div>
                <div className="electionBodyItem">
                    <label htmlFor="electionDescription" className="label">Election Description</label>
                    <textarea name="electionDescription" id="electionDescription" className="textarea" 
                    onChange={(e)=>{
                        setElectionDescription(e.target.value);
                    }}/>
                </div>
            </div>
            <button className="btn" onClick={createElection}>Create Election</button>
        </div>
    )
}