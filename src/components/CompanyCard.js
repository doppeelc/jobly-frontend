import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "../styles/CompanyCard.css";



function CompanyCard({ company }) {

    const detailUrl = `/companies/${company.handle}`;

    return (
        <a href={detailUrl}>
            <Card id="CompanyCard">
                <CardBody>
                    <CardTitle>
                        {company.name}
                    </CardTitle>
                    <CardText>
                        {company.description}
                    </CardText>
                    {company.logoUrl ?
                    <img src={company.logoUrl} alt={company.name} /> :
                    <React.StrictMode />
                    }
                </CardBody>
            </Card>
        </a>
    );
}

export default CompanyCard;