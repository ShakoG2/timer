import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from "./components/Timer";
import {Container} from "react-bootstrap";

ReactDOM.render(
  <Container fluid className="d-flex align-content-center flex-wrap" style={{height:'100vh',backgroundColor:'black'}}>
    <Timer/>
  </Container>,
  document.getElementById('root')
);
