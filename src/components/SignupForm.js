import React, { useState, useEffect } from "react";
import "../styles/SignupForm.css";


function SignupForm({ signup }) {

    const INIT_STATE = {
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:""
    }
    
    const [formData, setFormData] = useState(INIT_STATE);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]:value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormData(INIT_STATE);
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form id="SignupForm" onSubmit={handleSubmit}>
                <label id="lbl" htmlFor="username">Username</label>
                <input
                    id="inpt"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="password">Password</label>
                <input
                    id="inpt"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange} />
                    
                <label id="lbl" htmlFor="firstName">First Name</label>
                <input
                    id="inpt"
                    name="firstName"
                    placeholder="first name"
                    value={formData.firstName}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="lastName">Last Name</label>
                <input
                    id="inpt"
                    name="lastName"
                    placeholder="last name"
                    value={formData.lastName}
                    onChange={handleChange} />
                
                <label id="lbl" htmlFor="email">Email</label>
                <input
                    id="inpt"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange} />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;