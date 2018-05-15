import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Row } from 'reactstrap';

import Layout from '../../components/DashboardLayout';
import TableRow from '../TableRow';
import FormModal from '../FormModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';

import {requestPasswords, addPassword, updatePassword, deletePassword} from '../../actions/password-actions';

const INITIAL_STATE = {
  isLoading: false,
  activePassword: {},
  idDelete: '',
  showModal: false,
  showDeleteModal: false
};

const EMPTY_PASSWORD = {
  target: '',
  password: '',
  description: ''
};

class Dashboard extends React.Component {
  state = {...INITIAL_STATE};

  componentWillMount() {
    this.props.requestPasswords();
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

  postPasswordItem = (postObject) => {
    this.props.addPassword(postObject);
    this.setEmptyPassword();
  };

  updateItem = (updateObject) => {
    this.props.updatePassword(updateObject);
    this.setEmptyPassword();
  };

  deletePassword = () => {
    this.props.deletePassword(this.state.idDelete);
    this.toggleDeleteModal();
  };

  render() {
    const passwordArrayToPush = this.props.passwordsStore ?
      Object.keys(this.props.passwordsStore)
      .map(i => {
        return {
          ...this.props.passwordsStore[i],
          id: i
        }
      })
    : null;

    const tableRow = passwordArrayToPush ?
      (
        passwordArrayToPush.map((passwordObject, i) => {
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
      )
    : null;

    return (
      <Layout>
        <Row className="mt-3 mb-3 d-flex justify-content-between">
          <h2>{passwordArrayToPush ? "Your passwords" : "You don't have any passwords yet. Add your first password"}</h2>
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
        {
          passwordArrayToPush ?
            (
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
            )
            : null
        }

      </Layout>
    )
  }
}

// Make password  array available in  props
function mapStateToProps(state) {
  return {
    passwordsStore : state.passwordStore.passwords,
    loading: state.passwordStore.loading,
    errors: state.passwordStore.errors
  }
}

export default connect(mapStateToProps, {requestPasswords, addPassword, updatePassword, deletePassword})(Dashboard);
