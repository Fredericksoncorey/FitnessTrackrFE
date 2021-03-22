import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {default as MakeRoutine} from "./components/routines/MakeRoutine"
import {getToken, clearToken} from "./auth"
import{fetchUserData, fetchAllActivites} from "./api"
import {
  Login,
  LogOut,
  Register,
  MyRoutines,
  Routines,
  Activities
} from "./components"

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [activities, setActivities] = useState(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (loggedIn) {
        try {
            const data = await fetchUserData();
            setCurrentUser(data.username);
            const grabbedActivities = await fetchAllActivites();
            setActivities(grabbedActivities);

        } catch (error) {
            console.error(error);
        }
    }
  }, [loggedIn])

  return (
    <Router>
      <nav className="navBar">
        <h1>FitnessTrackr</h1>
        <div>

          <Link className="Link" to="/">
            Home
          </Link>
          <Link className="Link" to="/routines">
            Routines
          </Link>
          <Link className="Link" to="/myRoutines">
            My Routines
          </Link>
          <Link className="Link" to="/activities">
            Activites
          </Link>
          {
            /* !authorized  */ !loggedIn ? (
              <Link className="Link" to="/Login">
                Login
              </Link>
            ) : null
          }
          {
            /* !authorized  */ !loggedIn ? (
              <Link className="Link" to="/Register">
                Sign Up
              </Link>
            ) : null
          }
          {loggedIn ? (
            <Link
              className="Link"
              onClick={() => {
                clearToken();
                //setUsername(null);
                setLoggedIn(null);
                setAuthorized(null);
                setCurrentUser(null);
              }}
              to="/"
            >
              Log Out
            </Link>
          ) : null}
=======
          <Link className="Link" to= '/'>Home</Link>
          <Link className="Link" to= '/routines'>Routines</Link>
          <Link className="Link" to= '/myRoutines'>My Routines</Link>
          <Link className="Link" to= '/activities'>Activites</Link>
          {/* !authorized  */ !loggedIn ? (<Link className="Link" to= '/Login'>Login</Link>) : null}
          {/* !authorized  */ !loggedIn ? (<Link className="Link" to= '/Register'>Sign Up</Link>) : null}
          {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        //setUsername(null);
                        setLoggedIn(null);
                        setAuthorized(null)
                        setCurrentUser(null)
                    }}
                        to='/'>Log Out</Link> : null}

        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            {/* HomePage component  */}
          </Route>
          <Route path="/Login">
            {/*  {!authorized ? ( */}
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setAuthorized={setAuthorized}
              authorized={authorized}
            />
            {/*  ) : null} */}
          </Route>
          <Route path="/Register">
            {/* {!loggedIn ? */}{" "}
            <Register
              setAuthorized={setAuthorized}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />{" "}
            {/* : null} */}
          </Route>
          <Route path="/routines">
            <Routines />
          </Route>
          <Route path="/myRoutines">
            <MyRoutines
              loggedIn={loggedIn}
              currentUser={currentUser}
              activities={activities}
            />
          </Route>

          <Route path="/activities">
            <Activities
              loggedIn={loggedIn}
              currentUser={currentUser}
              activities={activities}
            />

          <Route path='/activities'>
          <Activities
             loggedIn={loggedIn}
             currentUser={currentUser}
             activities={activities}
             setActivities={setActivities}
              />

          </Route>
          <Route path="/createRoutine">
            <MakeRoutine />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
