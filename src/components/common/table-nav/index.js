import React from "react";
import { Nav, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class TableNav extends React.Component {
  render() {
    return (
      <div>
        <Nav pills>
          <Button color="primary" tag={Link} to="/add" className="mb-1">
            Add User <i className="material-icons">add</i>
          </Button>
        </Nav>
      </div>
    );
  }
}
