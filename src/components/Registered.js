// export default Registered;
import React, { useState, useEffect, useCallback } from 'react';
import ClassDataService from "../services/classes.js";
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from '@mui/material/Button';


import "./registered.css"
// useState hook is used to set and access state that needs to persist
// Any values that this applies to should be set using useState
const Registered = ({
    user,
    registered,
    addRegistered,
    deleteRegistered
}) => {
    const [classes, setClasses] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");
    const [searchDay, setSearchDay] = useState("");
    const [day, setDay,] = useState(["All Days"]);

    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    // Gets the list of all possible days that classes are held
    const retrieveDay = useCallback(() => {
        ClassDataService.getDay().then(response => {
            setDay(["All Days"].concat(response.data))
        })
        .catch(e => {
            console.log(e);
        });
    }, []);


    // Gets a list of classes
    const retrieveClasses = useCallback(() => {
        setCurrentSearchMode("");
        ClassDataService.getAll(currentPage).then(response => {
            setClasses(response.data.classes);
            setCurrentPage(response.data.page);
            setEntriesPerPage(response.data.entries_per_page);
        })
        .catch(e => {
            console.log(e);
        });
    }, [currentPage]);


    const find = useCallback((query, by ) => {
        ClassDataService.find(query, by, currentPage).then(response => {
            setClasses(response.data.classes);
        })
        .catch(e => {
            console.log(e);
        });
    }, [currentPage]);

    const findByTitle = useCallback(() => {
        setCurrentSearchMode("findByTitle");
        find(searchTitle, "title");
    }, [find, searchTitle]);

    const findByDay = useCallback(() => {
        setCurrentSearchMode("findByDay");
        if (searchDay === "All Days"){
            retrieveClasses();
        } else {
            find(searchDay, "day");
        }
    }, [find, searchDay, retrieveClasses]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === "findByDay") {
            findByDay()
        } else if (currentSearchMode === "findByTitle"){
            findByTitle();
        } else {
            retrieveClasses();
        }
    }, [currentSearchMode, findByTitle, findByDay, retrieveClasses]);

    useEffect(() => {
        retrieveDay();
    }, [retrieveDay]);

    useEffect(() => {
        setCurrentPage(0);
    }, [setCurrentSearchMode]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const onChangeSearchDay = e => {
        const searchDay = e.target.value;
        setSearchDay(searchDay);
    }


    // NEED TO ADD CSS
    return (
        <div className="App">
            <Container className="main-container">
                <div className="favoritesPanel">
                {
                    registered.length < 1 ?
                    "You haven't registered for any classes yet!"
                    :
                    "Here is your current schedule:"
                }
                </div>
                <Row className="classRow">
                    { classes.map((a_class) => {
                        return(
                            <div className="checkLogIn">
                            <Col className="regCol">
                            { user && (
                                registered.includes(a_class._id) ?
                                    <Card key={a_class._id} className="classesListCard">
                                       <Button variant="contained" color="error" className="buttonRegister" onClick={() => {
                                            deleteRegistered(a_class._id);
                                        }}
                                        >
                                            Remove Class
                                        </Button>
                                        <Card.Body className="titlebody">
                                            <Card.Title className="classname"> {a_class.title}</Card.Title>
                                            <Card.Text>
                                                Day: {a_class.day}
                                            </Card.Text>
                                            <Card.Text>
                                                Teacher: {a_class.faculty}
                                            </Card.Text>
                                            <Card.Text>
                                                Time {a_class.time}
                                            </Card.Text>
                                            <Card.Text>
                                                Age/Level: {a_class.level}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    :
                                    " "
                                    )}
                                    
                            </Col>
                            </div>
                            
                        )
                    })}
                </Row>
                <br />
            </Container>
        </div>
    )
}

export default Registered;