import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import "../styles/JobList.css";


function JobList() {

    const INIT_STATE = {
        search:""
    }

    const [ formData, setFormData ] = useState(INIT_STATE);
    const [ jobs, setJobs ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function getJobs() {
            let res = await JoblyApi.searchJobs();
            setJobs(res);
            setIsLoading(false);
        }
        getJobs();
    }, []);

    function handleChange(e) {
        setFormData({search:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        async function doJobs() {
            let res = await JoblyApi.searchJobs(formData.search);
            setJobs(res);
            setIsLoading(false);
            setFormData(INIT_STATE);
        }
        doJobs();
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div id="JobList">
            <form onSubmit={handleSubmit} id="JobList-form">
                <label id="label" htmlFor="job">Search jobs:</label>
                <input
                    id="job"
                    name="job"
                    placeholder="Job name"
                    value={formData.search}
                    onChange={handleChange} />
            </form>
            {jobs.map(j => 
                <JobCard
                    job={j}
                    key={j.id} />)}
        </div>
    )
}

export default JobList;