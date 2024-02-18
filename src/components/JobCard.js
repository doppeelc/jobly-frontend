import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "./UserContext";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "../styles/JobCard.css";
import { jwtDecode } from "jwt-decode";


function JobCard({ job }) {

    const { currentUser, applications, apply } = useContext(UserContext);
    const [ applied, setApplied ] = useState(applications.includes(job.id));
    
    async function doApply() {
        apply(job.id);
        setApplied(true);
    }

    if(!currentUser.loaded) {
        return <p>Loading...</p>
    }
    
    return (
        <Card id="JobCard">
            <CardBody>
                <CardTitle>
                    {job.title}
                </CardTitle>
                <CardText>
                    Salary: {job.salary}
                    {job.equity ?
                    <React.StrictMode>Equity: {job.equity}</React.StrictMode>:
                    <React.StrictMode />
                    }
                </CardText>
                <button disabled={applied} onClick={doApply}>{applied ? "Applied" : "Apply"}</button>
            </CardBody>
        </Card>
    )
}

export default JobCard;