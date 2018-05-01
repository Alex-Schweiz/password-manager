import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class FormModal extends React.Component {
  state = {
    passwordItem: {
      target: '',
      password: '',
      description: ''
    }
  };

  componentDidUpdate () {
    if (this.props.activePassword !== this.state.passwordItem) {
      this.setState({passwordItem: this.props.activePassword})
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const oldPassword = this.state.passwordItem;
    oldPassword[name] = value;
    this.setState({
      passwordItem: oldPassword
    });
  };

  handleSaveForm() {
    let savedForm = this.state.passwordItem;
    console.log(savedForm);
    if(this.state.passwordItem.id) {
      this.props.updateItem(savedForm, this.state.passwordItem.id);
    } else {
      this.props.saveItem(savedForm);
    }
    this.props.toggleShowModal();
  };

  handleCancelButton() {
    this.props.toggleShowModal();
  };

  render() {
    return (
      <Modal isOpen={this.props.showModal} toggle={this.props.toggleShowModal}>
        <ModalHeader toggle={this.toggle}>{this.props.activePassword.target === '' ? "Add" : "Edit" } a password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="target">Target</Label>
              <Input
                type="text"
                name="target"
                id="target"
                placeholder="Your target"
                value={this.state.passwordItem.target}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                placeholder="Your password"
                value={this.state.passwordItem.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Description"
                value={this.state.passwordItem.description}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => this.handleSaveForm()}>Save</Button>{' '}
          <Button color="secondary" onClick={this.props.cancelButton}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default FormModal;