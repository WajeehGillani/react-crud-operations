import React from "react";
import Dtable from "../components/data-table"
import Forms from "../components/common/form/"
import Welcome from "../components/common/welcome"
import EditUser from "../components/edit-user"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends React.Component {
  state = {
    isOpen: false
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">
              React CRUD App
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/listings">
                    Listings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/add">
                    Add User
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div className="container mt-5">
            <Route path="/" exact component={Welcome} />
            <Route path="/listings" component={Dtable} />
            <Route path="/add" component={Forms} />
            <Route path="/edit/:id" component={EditUser} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
