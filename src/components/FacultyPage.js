import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Table, TableBody, TableHead} from '@mui/material/';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import CenteredTable from "./components/CenteredTable.js";

import './facultypage.css';


function FacultyPage() {

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Faculty Name', width: 150},
    { field: 'col2', headerName: 'Classes Offered', width: 150},
    { field: 'col3', headerName: 'Years Teaching', width: 150},
    { field: 'col4', headerName: 'Contact', width: 200},
];

  const rows: GridRowsProp = [
    { id: 1, col1: 'Miss Allison', col2: "Ballet I, Ballet IV", col3: "10", col4: "missallison@pacewv.com"},
    { id: 2, col1: 'Miss Jessica', col2: 'Tiny Tutus', col3: "15", col4: "missjessica@pacewv.com" },
    { id: 3, col1: 'Miss Morgan', col2: 'Ballet II', col3: "17", col4: "missmorgan@pacewv.com" },
    { id: 4, col1: 'Miss Michelle', col2: 'Ballet III', col3: "20", col4: "missmichelle@pacewv.com" },
];


  return (
    <div className="App">
      <div className="Title1">
        Faculty Information
      </div>
      <div  style={{ height: 320, width: "100%"}}>
        <DataGrid className="facultyTable" rows={ rows } columns={ columns } />    
      </div> 
      <Container className="photo-cont">
        <div className="Title2">
          Class Descriptions
        </div>
        <Row className="stylerow1">
          <Col className="col1">
          <div className="classtitle">
          Ballet
          </div>
          <p className="description">
          Ballet is a foundational style encouraged for all dancers. 
          It is a classical style of expressive dancing based on precise 
          conventional steps with gestures and movements of grace and fluidity.
          </p>
          <img className="style_photos" src={"images/ballet.png"}/>
          </Col>
          <Col className="col2">
          <div className="classtitle">
          Jazz
          </div>
          <p className="description">
          Jazz is a style of high-energy dance has a liveliness that sets it apart from traditional dance forms, 
          such as classical ballet. 
          Like jazz music, jazz dance features improvisation and rythmn.
          </p>
          <img className="style_photos" src={"images/jazz.png"}/>
          </Col>
          </Row>

          <Row className="stylerow2">
          <Col className="col3">
          <div className="classtitle">
          Hip Hop
          </div>
          <p className="description">
          Hip Hop is a style of street dance form that evolved from hip hop culture and hip hop music. 
          It borrows elements from a number of different styles like African dance, tap, and ballet.
          </p>
          <img className="style_photos" src={"images/hiphop.png"}/>
          </Col>
          <Col className="col4">
          <div className="classtitle">
          Lyrical
          </div>
          <p className="description">
          Lyrical is a rythmn style of dance strongly associated with clearly displayed emotional moods, 
          fast-moving choreographic strategies, emphasis on virtuosic display, 
          illustration of song lyrics, and, in group form, exact unison.
          </p>
          <img className="style_photos" src={"images/lyrical.png"}/>
          </Col>
       </Row>
      </Container>
      
      
    </div>
      );
}

export default FacultyPage;
