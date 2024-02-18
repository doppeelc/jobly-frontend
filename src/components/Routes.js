import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ProfilePage from "./ProfilePage";


function Routes({ currentUser, signup, login }) {

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            {currentUser &&
            <React.StrictMode>
                <Route exact path="/companies">
                    <CompanyList />
                </Route>
                
                <Route exact path="/companies/:id">
                    <CompanyDetail />
                </Route>
                
                <Route exact path="/jobs">
                    <JobList />
                </Route>
                
                <Route exact path="/profile">
                    <ProfilePage />
                </Route>  
            </React.StrictMode>
            }
            
            {!currentUser &&
            <React.StrictMode>
                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>
                
                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route> 
            </React.StrictMode>
            }
            
                            
        </Switch>
    );
}

export default Routes;