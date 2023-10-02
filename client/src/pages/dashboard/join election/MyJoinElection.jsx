import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export const MyJoinElection = () => {

    const [response, setResponse] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        }
        else {
            Axios.get('http://localhost:3010/api/election/getjoin', {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }
            ).then((result) => {
                setResponse(result.data);
                console.log(response)
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [])

    return (
        <div className="electionContainer">
            <div className="electionHeader">
                <div className="heading">
                    <h1>My Join Elections</h1>
                </div>
                <button className="btn" onClick={() => {
                    navigate("/dashboard/joinelection/join");
                }}>Join Election</button>
            </div>
            <div className="listContainer">
                <div className="listHeader">
                    <h4>Name</h4>
                    <h4>Status</h4>
                    <h4>More details</h4>
                </div>
                <div className="elections">
                {response.length === 0 ? (
                    <div className="noElection">
                        <h3>No Elections</h3>
                    </div>
                ) : (
                    response.map((item) => {
                        return (
                            <div className="election" key={item.id}>
                                <h4>{item.electionName}</h4>
                                <p>{item.electionResult}</p>
                                <button className="btn" onClick={() => {
                                    navigate("/dashboard/joinelection/view", { state: { election: item } });
                                }}>View</button>
                            </div>
                        );
                    })
                )}
                </div>
            </div>
        </div>
    )
}