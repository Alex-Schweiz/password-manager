import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const confirmDeleteModal = (props) => (
  <Modal isOpen={props.showModal} toggle={props.closeModal}>
    <ModalHeader>Are you sure you want to delete target?</ModalHeader>
    <ModalBody>
      <Button
        color="danger"
        onClick={() => props.deleteItem(props.idItemToDelete)}
      >Yes</Button>{' '}
      <Button
        color="success"
        onClick={props.closeModal}
      >No</Button>
    </ModalBody>
  </Modal>
);

export default confirmDeleteModal;