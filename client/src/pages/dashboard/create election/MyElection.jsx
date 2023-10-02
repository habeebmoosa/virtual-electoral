import React, { useEffect, useState } from "react";
import '../../../css/Election.css';
import '../../../css/utils.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export const MyElection = () => {

    const navigate = useNavigate();
    const [response, setResponse] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        } else {
            Axios.get('http://localhost:3010/api/election/list', {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((result) => {
                console.log(result.data);
                setResponse(result.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    return (
        <div className="electionContainer">
            <div className="electionHeader">
                <div className="heading">
                    <h1>My Election</h1>
                </div>
                <button className="btn" onClick={()=>{
                    navigate("/dashboard/myelection/create");
                }}>Create Election</button>
            </div>
            <div className="listContainer">
                <div className="listHeader">
                    <h4>Name</h4>
                    <h4>Status</h4>
                    <h4>More details</h4>
                </div>
                <div className="elections">
                    {
                        response.map((item) => {
                            return (
                                <div className="election">
                                    <h4>{item.electionName}</h4>
                                    <p>{item.electionResult}</p>
                                    <button className="btn" onClick={()=>{
                                        navigate("/dashboard/myelection/view", { state: { election: item } });
                                    }}>View</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}