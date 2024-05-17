import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { register, login } from '../../API';
import { useForm } from '../../Hooks/useForm';
import { UserContext } from '../../Hooks/userContext';

const Formu = ({ isRegister, onHide }) => {
  const { setUser } = useContext(UserContext);

  const [values, handleChange] = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    description: '',
  });

  //Handles the submit allowing the user register or login
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    
    const userObj = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      firstName: values.firstName,
      lastName: values.lastName,
      description: values.description,
    };
  
    const registerOrLogin = async () => {
      try {
        if (isRegister) {
          const response = await register(userObj);
          alert(response.message);
        } else {
          const response = await login(userObj.username, userObj.password);
          alert(`Welcome ${response.username}`);
          setUser(response);
          localStorage.setItem('loggedIn', true);
        }
        onHide(); // closes the modal
      } catch (error) {
        console.error('Error in registerOrLogin:', error);
        alert(`An error occurred: ${error.message}`);
      }
    };
    
    registerOrLogin();
  };
  

  return (
    <Form>
      <Form.Group className='mb-3'>
        {isRegister && (
          <>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name='firstName'
              value={values.firstName}
              placeholder='Enter first name'
              onChange={handleChange}
            />
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name='lastName'
              value={values.lastName}
              placeholder='Enter last name'
              onChange={handleChange}
            />
          </>
        )}
        <Form.Label>Username</Form.Label>
        <Form.Control
          name='username'
          value={values.username}
          placeholder='Enter Username'
          onChange={handleChange}
        />
        {isRegister && (
          <>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name='email'
              value={values.email}
              placeholder='Enter email'
              onChange={handleChange}
            />
          </>
        )}
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          value={values.password}
          placeholder='Enter password'
          onChange={handleChange}
        />
        {isRegister && (
          <>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              name='confirmPassword'
              value={values.confirmPassword}
              placeholder='Confirm password'
              onChange={handleChange}
            />
          </>
        )}
      </Form.Group>
      <Button
        variant='primary'
        data-bs-dismiss='modal'
        onClick={handleAddFormSubmit}
      >
        {isRegister ? 'Create new account' : 'Login'}
      </Button>
    </Form>
  );
};

Formu.propTypes = {
  isRegister: PropTypes.bool,
  onHide: PropTypes.func,
};

export default Formu;
