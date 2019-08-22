import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
const Welcome = ()=> {
 return (
     <div>
         <Jumbotron fluid>
             <Container fluid>
                 <h1 className="display-3">Welcome</h1>
                 <p className="lead">This is a basic React CRUD operation app for learning purpose</p>
             </Container>
         </Jumbotron>
     </div>
 );   
}
export default Welcome;