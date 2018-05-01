import React from 'react';

import { Button, Table, Alert, Row } from 'reactstrap';

import TableRow from '../TableRow/TableRow';
import FormModal from '../FormModal/FormModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal/ConfirmDeleteModal';

import DashboardLayout from '../../hoc/DashboardLayout/DashboardLayout';

import axios from 'axios';

class Dashboard extends React.Component {
  state = {
    isLoading: false,
    activePassword: {},
    passwords: [],
    idDelete: '',
    showModal: false,
    showDeleteModal: false
  };

  componentWillMount() {
    this.getPasswords();
  }

  getPasswords() {
    let downloadUrl = 'https://react-password-manager-7.firebaseio.com/passwords.json';
    axios.get(downloadUrl)
      .then(response => {
        console.log(response);
        let arrayToPush = Object.keys(response.data)
          .map(i => {
            return {
              ...response.data[i],
              id: i
            }
          });
        this.setState({passwords: arrayToPush});
      })
  }

  handleEditMode = (singlePassword) => {
    this.setState({activePassword: {...singlePassword}});
    this.toggleShowModal();
  };

  handleDeleteMode = (id) => {
    this.setState({idDelete: id});
    this.toggleDeleteModal();
  };

  toggleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal
    });
  };

  setEmptyPassword() {
    this.setState({
      activePassword : {
        target: '',
        password: '',
        description: ''
      }
    })
  };

  deletePassword = () => {
    let idToDelete = this.state.idDelete;
    let deleteUrl = `https://react-password-manager-7.firebaseio.com/passwords/${idToDelete}.json`;
    axios.delete(deleteUrl)
      .then(response => {
        console.log(response);
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.toggleDeleteModal();
  };

  postPasswordItem = (postObject) => {
    let downloadUrl = 'https://react-password-manager-7.firebaseio.com/passwords.json';
    axios.post(downloadUrl, postObject)
      .then(response => {
        console.log(response);
        console.log(postObject);
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.setEmptyPassword();
  };

  updateItem = (updateObject, id) => {
    let downloadUrl = `https://react-password-manager-7.firebaseio.com/passwords/${id}.json`;
    axios.put(downloadUrl, updateObject)
      .then(response => {
        console.log(response);
        console.log(updateObject);
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.setEmptyPassword();
  };

  handleCancelButton = () => {
    this.setEmptyPassword();
    this.toggleShowModal();
  };

  render() {
    return (
      <DashboardLayout>
        <Row className="mt-3 mb-3 d-flex justify-content-between">
          <h2>Your passwords</h2>
          <Button color="success" onClick={this.toggleShowModal}>Add a password</Button>
        </Row>
        <FormModal
          showModal={this.state.showModal}
          cancelButton={() => this.handleCancelButton()}
          toggleShowModal={() => this.toggleShowModal()}
          saveItem={this.postPasswordItem}
          updateItem={this.updateItem}
          activePassword={this.state.activePassword}
        />
        <ConfirmDeleteModal
          showModal={this.state.showDeleteModal}
          deleteItem={this.deletePassword}
          closeModal={this.toggleDeleteModal}
          idItemToDelete={this.state.idDelete}
        />
        <Table hover striped>
          <thead>
          <tr>
            <th>#</th>
            <th>Target</th>
            <th>Password</th>
            <th>Description</th>
            <th className="actions-width">Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.state.passwords.map((passwordObject, i) => {
            return (
              <TableRow
                key={i}
                number={i}
                revealPassword={() => this.revealPassword()}
                singlePassword={passwordObject}
                handleDeletePassword={this.handleDeleteMode}
                handleEditMode={this.handleEditMode}
              />
            )
          })}
          </tbody>
        </Table>
        <Alert color="primary">
          This is a primary alert — check it out!
        </Alert>
      </DashboardLayout>
    )
  }
};

export default Dashboard;