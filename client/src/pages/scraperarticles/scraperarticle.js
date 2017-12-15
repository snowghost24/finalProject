import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";


class ScrapedA extends Component {
   state = {
     books: [],
     title: "",
     author: "",
     synopsis: ""
   };
 
   render() {
     return (
       <Container fluid>
         <Row>
           <Col size="md-6">
             <Jumbotron>
               <h1>What Books Should I Read?</h1>
             </Jumbotron>
             </Col>
         </Row>
       </Container>
     );
   }
 }
 
 export default ScrapedA;