import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "../api";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";


function CompanyDetail() {

    const { id } = useParams();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ company, setCompany ] = useState();
    console.log(id);

    useEffect(() => {
        async function getCompany() {
            let comp = await JoblyApi.getCompany(id);
            setCompany(comp);
            setIsLoading(false);
        }
        getCompany();
    }, [])

    if(isLoading) {
        return (<p>Loading...</p>)
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    {company.name}
                </CardTitle>
                <CardText>
                    {company.description}
                </CardText>
                <h3>{company.name}'s jobs</h3>
                <div id="CompanyDetail-jobs">
                    {company.jobs.map( j => 
                        <JobCard
                            job={j}
                            key={j.id}
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default CompanyDetail;