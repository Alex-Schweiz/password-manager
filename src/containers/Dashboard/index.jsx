import React from 'react';
import axios from 'axios';
import { Button, Table, Row } from 'reactstrap';

import Layout from '../../components/DashboardLayout';
import TableRow from '../TableRow';
import FormModal from '../FormModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

const INITIAL_STATE = {
  isLoading: false,
  activePassword: {},
  passwords: [],
  idDelete: '',
  showModal: false,
  showDeleteModal: false
};

const EMPTY_PASSWORD = {
  target: '',
  password: '',
  description: ''
};

export default class Dashboard extends React.Component {
  state = {...INITIAL_STATE};

  componentWillMount() {
    this.getPasswords();
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
    this.setState({showModal: !this.state.showModal});
  };

  toggleDeleteModal = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal});
  };

  setEmptyPassword() {
    this.setState({activePassword : {...EMPTY_PASSWORD}});
  };

  handleCancelButton = () => {
    this.setEmptyPassword();
    this.toggleShowModal();
  };

  getPasswords() {
    const downloadUrl = 'https://react-password-manager-7.firebaseio.com/passwords.json';
    axios.get(downloadUrl)
      .then(response => {
        const arrayToPush = Object.keys(response.data)
          .map(i => {
            return {
              ...response.data[i],
              id: i
            }
          });
        this.setState({passwords: arrayToPush});
      })
  };

  postPasswordItem = (postObject) => {
    const downloadUrl = 'https://react-password-manager-7.firebaseio.com/passwords.json';
    axios.post(downloadUrl, postObject)
      .then(response => {
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.setEmptyPassword();
  };

  updateItem = (updateObject, id) => {
    const downloadUrl = `https://react-password-manager-7.firebaseio.com/passwords/${id}.json`;
    axios.put(downloadUrl, updateObject)
      .then(response => {
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.setEmptyPassword();
  };

  deletePassword = () => {
    const idToDelete = this.state.idDelete;
    const deleteUrl = `https://react-password-manager-7.firebaseio.com/passwords/${idToDelete}.json`;
    axios.delete(deleteUrl)
      .then(response => {
        if(response.status === 200) {
          this.getPasswords();
        }
      });
    this.toggleDeleteModal();
  };

  render() {
    const tableRow = (
      this.state.passwords.map((passwordObject, i) => {
        return (
          <TableRow
            key={passwordObject.id}
            number={i}
            revealPassword={() => this.revealPassword()}
            singlePassword={passwordObject}
            handleDeletePassword={this.handleDeleteMode}
            handleEditMode={this.handleEditMode}
          />
        )
      })
    );

    return (
      <Layout>
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
        <Table hover striped responsive>
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
          {tableRow}
          </tbody>
        </Table>
      </Layout>
    )
  }
}
