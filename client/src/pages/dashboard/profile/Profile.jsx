import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../css/Dashboard.css';
import '../../../css/utils.css';
import Axios from "axios";

export const Profile = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        } else {
            Axios.get("http://localhost:3010/api/user/get", {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then((result) => {
                setResponse(result.data);
                console.log("result.data");
            }).catch((error) => {
                console.log(error);
            }
            );
        }
    },[]);

    const Edit = () => {
        navigate("/dashboard/profile/edit", { state: { user: response[0] } });
    }

    return (
        <div className="profileContainer">
            {response.map((item) => {
                return (
                    <div className="profile">
                        <div className="heading">
                            <h1>Profile</h1>
                        </div>
                        <div className="profileBody">
                            <div className="profileBodyItem">
                                <h3>Name</h3>
                                <p>{item.name}</p>
                            </div>
                            <div className="border-line"></div>
                            <div className="profileBodyItem">
                                <h3>Email</h3>
                                <p>{item.email}</p>
                            </div>
                            <div className="border-line"></div>
                            <div className="profileBodyItem">
                                <h3>Phone Number</h3>
                                <p>{item.phoneno}</p>
                            </div>
                            <div className="border-line"></div>
                            <div className="profileBodyItem">
                                <h3>Password</h3>
                                <p>***********</p>
                            </div>
                        </div>
                        <div className="editBtn">
                            <button className="btn" onClick={Edit}>Edit</button>
                        </div>
                    </div>

                )
            })}
        </div>
    );
}