import React from 'react';
import { Table, Button, Spinner } from 'reactstrap';
import TableNav from '../common/table-nav/';
import axios from 'axios';
import { Link } from 'react-router-dom';

class DataTable extends React.Component {
  state = {
    users: [],
    loading: false,
    
  };

  /**
   * Good
   */
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      'https://react-training-apis.herokuapp.com/api/users/list'
    );
    const data = await response.json();
    this.setState({
      users: data,
      loading: false
    });
  };

  deleteUser = id => {
    axios
      .delete(
        `https://react-training-apis.herokuapp.com/api/users/${id}/delete`
      )
      .then(res => {
        this.fetchUsers();
      });
  };

  renderRows = () =>
    this.state.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.gender}</td>
        <td>{user.email}</td>
        <td>{user.profession}</td>
        <td>
          {user.address < 20
            ? `${user.address}`
            : `${user.address.substring(0, 25)}...`}
        </td>
        <td>
          <Link to={`/add/${user.id}`}>
            <i className='material-icons'>edit</i>
          </Link>
          {'  '}
          <Button
            color='danger'
            onClick={() => {
              this.deleteUser(user.id);
            }}
          >
            <i className='material-icons'>delete_sweep</i>
          </Button>
        </td>
      </tr>
    ));

  render() {
    return (
      <>
        <h3>Data Listings</h3>
        <div className='float-right'>
          <TableNav />
        </div>
        {this.state.loading ? (
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Profession</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.renderRows()}</tbody>
            </Table>
          )}
      </>
    );
  }
}

export default DataTable;
