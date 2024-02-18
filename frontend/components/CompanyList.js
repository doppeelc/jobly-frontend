import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import "../styles/CompanyList.css"


function CompanyList() {

    const INIT_STATE = {
        search:""
    }

    const [ formData, setFormData ] = useState(INIT_STATE);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ companies, setCompanies ] = useState();

    useEffect(() => {
        async function getCompanies() {
            let res = await JoblyApi.searchCompanies();
            setCompanies(res);
            setIsLoading(false);
        }
        getCompanies();
    }, []);

    function handleChange(e) {
        setFormData({search:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        async function doCompanies() {
            let res = await JoblyApi.searchCompanies(formData.search);
            setCompanies(res);
            setIsLoading(false);
            setFormData(INIT_STATE);
        }
        doCompanies();
    }
    
    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div id="CompanyList">
            <form onSubmit={handleSubmit} id="CompanyList-form">
                <label id="label" htmlFor="company">Search companies:</label>
                <input
                    id="company"
                    name="company"
                    placeholder="Company name"
                    value={formData.search}
                    onChange={handleChange} />
            </form>
            {companies.map(c =>
                <CompanyCard
                    company={c}
                    key={c.handle} />
            )}
        </div>
    );
}

export default CompanyList;