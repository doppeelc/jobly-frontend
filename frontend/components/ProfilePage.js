import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import "../styles/ProfilePage.css";
import JoblyApi from "../api";


function ProfilePage() {

    const { currentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
                username:currentUser.data.username,
                firstName:currentUser.data.firstName,
                lastName:currentUser.data.lastName,
                email:currentUser.data.email
            });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]:value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        JoblyApi.updateUser(formData);
    }

    return (
        <div id="ProfilePage">
            <h1>Profile</h1>
            <form id="ProfilePage-form" onSubmit={handleSubmit}>
                <label id="lbl" htmlFor="username">Username</label>
                <input
                    id="inpt"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly />
                
                <label id="lbl" htmlFor="firstName">First Name</label>
                <input
                    id="inpt"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="lastName">Last Name</label>
                <input
                    id="inpt"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="email">Email</label>
                <input
                    id="inpt"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} />
                <button>Update Info</button>
            </form>
        </div>
    );
}

export default ProfilePage;