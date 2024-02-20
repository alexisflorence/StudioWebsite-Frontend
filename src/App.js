import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { GoogleOAuthProvider } from '@react-oauth/google';

import ClassesList from "./components/ClassesList";
import Homepage from "./components/Homepage";
import Registered from "./components/Registered.js";
import FacultyPage from "./components/FacultyPage.js";

import RegisteredDataService from "../src/services/registered.js"

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  // the variables we will use later to functions that we will use later 
  const [user, setUser ] = useState(null);
  const [registered, setRegistered] = useState([]);
  // Write the favorites to the database
  //const [regClasses, setRegClasses] = useState([]);
  const [doSaveRegistered, setDoSaveRegistered] = useState(false);

  const addRegistered = (classId) => {
    setRegistered([...registered, classId]);
    setDoSaveRegistered(true);
  }

  // this function should delet a registered class from the registered list
  const deleteRegistered = (classId) => {
    setRegistered(registered.filter(f => f !== classId));
    setDoSaveRegistered(true); // 
  }

  // Updates the database with the updates list of registered classes
  const saveRegistered = useCallback (() => {
    var data = {
      _id: user.googleId,
      registered: registered
    }
    RegisteredDataService.updateRegisteredList(data)
      .catch(e => {
        console.log(e);
      })
  },[registered, user]);


   // Function that gets the list of registered classes from our database
   const retrieveRegistered = useCallback (() => {
    RegisteredDataService.getAll(user.googleId)
      .then(response => {
        setRegistered(response.data.registered);
    })
    .catch(e => {
      console.log(e);
    });
  },[user]);

  // set our user from login info
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        //Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  // if the user is logged in and the database has not been updated
  // update it now
  useEffect(() => {
    if (user && doSaveRegistered){
      saveRegistered();
      setDoSaveRegistered(false);
    }
  }, [user, registered, saveRegistered, doSaveRegistered]);

  useEffect(() => {
    if (user){
      retrieveRegistered();
    }
  }, [user, retrieveRegistered]);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        {/* TOP NAVBAR ON HOMEPAGE*/}
        <Navbar className="navbar-custom" expand="lg"  variant="dark">
          <Container className="container-fluid">
            <Navbar.Brand className="brand" href="/">
              <img src={process.env.PUBLIC_URL + "/images/PACEStudiowhite.png"} alt="studio logo" className="studioLogo"/>
            </Navbar.Brand>
            <Navbar.Brand className ="login-out">
            { user ? (
                    <Logout  setUser={setUser} />
                  ) : (
                    <Login  setUser={setUser} />
            )}
            </Navbar.Brand>
          </Container>
        </Navbar>

        {/* DROPDOWN MENU ON HOMEPAGE*/}
        <Dropdown id="main-menu">
          <DropdownToggle expand="lg" alignment="center">
                MENU
          </DropdownToggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-right unique-color-dark" >
            <DropdownItem className="dropdown-item-registered" href="/registered" active>
                YOUR SCHEDULE
            </DropdownItem>
            <DropdownItem className="dropdown-item-faculty" href="/faculty" active>
                FACULTY AND CLASS INFO
            </DropdownItem>
            <DropdownItem className="dropdown-item-classes" href="/classes" component={<ClassesList/>} active>
                REGISTER FOR CLASSES
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>

        {/* ROUTES TO OUR 3 OTHER PAGES ON THE WEBSITE*/}
        <Routes>
          <Route exact path={"/"} element={
            <Homepage />}
            /> 

          <Route exact path={"/classes"} element={
            <ClassesList 
              user={ user }
              addRegistered={ addRegistered }
              deleteRegistered={ deleteRegistered }
              registered={ registered }
            />}
            />

          <Route path={"/registered"} element={
            user ?
            <Registered 
              user={ user }
              addRegistered={ addRegistered }
              deleteRegistered={ deleteRegistered }
              registered={ registered }

            />
            :
            <div className="errormessage">
            You must be logged in to view your registered classes!
            </div>
          }/>
          <Route path={"/faculty"} element={
            <FacultyPage />}
            />

          
        </Routes>
        </div>
        </GoogleOAuthProvider>
  );
}

export default App;
