import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Formu from '../Formu/Formu';

const ModalForm = ({ show, onHide, header, isRegister }) => {
  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formu isRegister={isRegister} onHide={onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' data-bs-dismiss='modal' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalForm.propTypes = {
  show: PropTypes.bool,
  isRegister: PropTypes.bool,
  onHide: PropTypes.func,
  header: PropTypes.string,
};

export default ModalForm;
