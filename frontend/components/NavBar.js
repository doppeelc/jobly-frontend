import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";
import "../styles/NavBar.css";


function NavBar({ logout }) {

    const { currentUser } = useContext(UserContext);

    return (
        <Navbar expand="md" id="NavBar">
            <NavItem id="NavBar-home">
                <NavLink exact to="/" id="NavBar-link">Jobly</NavLink>
            </NavItem>

            <Nav id="NavBar-Nav" >

                { currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-others">
                        <NavLink to="/profile" id="NavBar-link">Profile</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/" id="NavBar-link" onClick={logout}>Log Out {currentUser.username}</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/companies" id="NavBar-link">Companies</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/jobs" id="NavBar-link">Jobs</NavLink>
                    </NavItem>
                </React.StrictMode>
                }
                { !currentUser.data &&
                <React.StrictMode>
                    <NavItem id="NavBar-others">
                        <NavLink to="/login" id="NavBar-link">Login</NavLink>
                    </NavItem>

                    <NavItem id="NavBar-others">
                        <NavLink to="/signup" id="NavBar-link">Sign Up</NavLink>
                    </NavItem>
                </React.StrictMode>
                }

            </Nav>
        </Navbar>
    );
}

export default NavBar;