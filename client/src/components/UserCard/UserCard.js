import React, { useContext, useState } from 'react';
import { Col, Row, Form, InputGroup, Button } from 'react-bootstrap';
import { UserContext } from '../../Hooks/userContext';

function UserCard() {
  const [validated, setValidated] = useState(false);
  const { user } = useContext(UserContext);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className='mb-3'>
        <Form.Group as={Col} md='3' controlId='validationCustomUsername'>
          <Form.Label>First Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='text'
              placeholder='First Name'
              aria-describedby='inputGroupPrepend'
              defaultValue={user.firstName}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md='3' controlId='validationCustomUsername'>
          <Form.Label>Last Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='text'
              placeholder='Last Name'
              aria-describedby='inputGroupPrepend'
              defaultValue={user.lastName}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md='3' controlId='validationCustomUsername'>
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type='text'
              placeholder='Username'
              aria-describedby='inputGroupPrepend'
              defaultValue={user.username}
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md='3' controlId='validationCustom02'>
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
            <Form.Control
              required
              type='text'
              placeholder='Last name'
              defaultValue={user.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md='10' controlId='validationCustom02'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Description'
            defaultValue={user.description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant='outline-success' type='submit'>
        Submit form
      </Button>
    </Form>
  );
}

export default UserCard;
