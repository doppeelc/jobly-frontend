import { useEffect, useState } from 'react';
import Routes from './Routes';
import JoblyApi from '../api';
import UserContext from './UserContext';
import NavBar from './NavBar';
import { jwtDecode } from "jwt-decode";
import '../styles/App.css';

function App() {

  const [ token, setToken ] = useState(localStorage.getItem("token"));
  const [ applications, setApplications ] = useState({});
  const [ currentUser, setCurrentUser ] = useState({
    loaded:false,
    data:null
  });

  useEffect(
    function loadUser() {

      async function getUser() {
        if(token) {
          try {
            let { username } = jwtDecode(token);
            JoblyApi.token = token;
            let user = await JoblyApi.getCurrentUser(username);
            setCurrentUser({loaded:true, data:user});
            setApplications(user.applications);
          } catch (e) {
            setCurrentUser({loaded:true, data:null});
          }
        } else {
          setCurrentUser({loaded:true, data:null});
        }
      }
      getUser();
    },
    [token]
  );

  async function signup(user) {
    let res = await JoblyApi.register(user);
    setToken(res);
    localStorage.setItem("token", res);
  }

  async function login(username, password) {
    let res = await JoblyApi.login(username, password);
    setToken(res);
    localStorage.setItem("token", res);
  }

  function logout() {
    setCurrentUser({loaded:true, data:null});
    setToken(null);
    localStorage.removeItem("token");
  }

  async function apply(jobId) {
    await JoblyApi.applyForJob(currentUser.data.username, jobId);
  }

  if(!currentUser.loaded) {
    return <p>Loading...</p>
  }
  
  return (
    <div className="App">
      <UserContext.Provider value={{
              currentUser:currentUser,
              applications:applications,
              apply:apply
          }}>
        <NavBar currentUser={currentUser.data} logout={logout} />
        <Routes currentUser={currentUser.data} signup={signup} login={login} logout={logout} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
