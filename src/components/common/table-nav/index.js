import React from "react";
import { Nav, Button } from "reactstrap";
import { Link } from "react-router-dom";

const TableNav = () => (
  <div>
    <Nav pills>
      <Button color="primary" tag={Link} to="/add" className="mb-1">
        Add User <i className="material-icons">add</i>
      </Button>
    </Nav>
  </div>
);

export default TableNav;
