import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const INITIAL_STATE = {
  passwordItem: {
    target: '',
    password: '',
    description: ''
  },
  fieldErrors: {},
};

export default class FormModal extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidUpdate () {
    if (this.props.activePassword !== this.state.passwordItem) {
      this.setState({passwordItem: this.props.activePassword})
    }
  }

  /**
   * Handle change on form fields
   * @param event
   */
  handleChange = (event) => {
    const passwordItem = this.state.passwordItem;
    passwordItem[event.target.name] = event.target.value;
    this.setState({passwordItem});
  };

  /**
   * Handling saving form state
   */
  handleSaveForm() {
    const passwordItem = this.state.passwordItem;
    const fieldErrors = this.validate(passwordItem);

    // Check if there are any errors
    if (Object.keys(fieldErrors).length) return;

    if(this.state.passwordItem.id) {
      this.props.updateItem(passwordItem, this.state.passwordItem.id);
    } else {
      this.props.saveItem(passwordItem);
    }
    this.props.toggleShowModal();
  };

  validate = (passwordItem) => {
    const fieldErrors = {};
    if (!passwordItem.target) fieldErrors.target = 'Target is required';
    if (!passwordItem.password) fieldErrors.password = 'Password is required';
    this.setState({fieldErrors});
    return fieldErrors;
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
                placeholder="Your target"
                invalid={this.state.fieldErrors.target}
                value={this.state.passwordItem.target}
                onChange={this.handleChange}
              />
              <FormFeedback>{this.state.fieldErrors.target}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                placeholder="Your password"
                invalid={this.state.fieldErrors.password}
                value={this.state.passwordItem.password}
                onChange={this.handleChange}
              />
              <FormFeedback>{this.state.fieldErrors.password}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Description"
                value={this.state.passwordItem.description}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => this.handleSaveForm()}
          >
            Save
          </Button>{' '}
          <Button
            color="secondary"
            onClick={this.props.cancelButton}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
