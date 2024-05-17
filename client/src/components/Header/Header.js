// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Navbar,
//   NavDropdown,
//   Nav,
//   Container,
//   Form,
//   FormControl,
//   Button,
// } from 'react-bootstrap';
// import { getMovieIfNotExistsAddsDB, logout } from '../../API';
// import ModalForm from '../ModalForm/ModalForm';
// import { UserContext } from '../../Hooks/userContext';

// const Header = () => {
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleUserProfile = () => {
//     navigate(`/user`);
//   };

//   const [movie, setMovie] = useState('');
//   const [modalShowR, setModalShowR] = useState(false);
//   const [modalShowL, setModalShowL] = useState(false);

//   const handleOnChange = (e) => {
//     setMovie(e.target.value);
//     //console.log(e.target.value);
//   };
                 
//   const fetchRequest = async () => {
//     try {
//       const result = await getMovieIfNotExistsAddsDB(movie);

//       console.log(result);
//      // console.log(movie);
//       return setMovie(result);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setMovie('');
//     }
//   };

//   const handleLogout = () => {
//     const fetchRequest = async () => {
//       try {
//         const result = await logout();
//         setUser('');
//         localStorage.clear();
//         navigate(`/`);
//         return result.data;
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRequest();
//   };

//   return (
//     <Navbar
//       collapseOnSelect
//       expand='lg'
//       bg='dark'
//       variant='dark'
//       style={{ position: 'flex', top: '0px' }}
//     >
//       <Container>
//         <Navbar.Brand>
//           <h1>Movies Library</h1>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls='responsive-navbar-nav' />
//         <Navbar.Collapse id='responsive-navbar-nav'>
//           <Nav className='me-auto'>
//             <Nav.Link href='/'>Home</Nav.Link>
//             <Form className='d-flex'>
//               <FormControl
//                 value={movie}
//                 type='search'
//                 placeholder='Search'
//                 className='me-2'
//                 aria-label='Search'
//                 onChange={handleOnChange}
//               />
//               <Button onClick={fetchRequest} variant='outline-success'>
//                 Search
//               </Button>
//             </Form>
//           </Nav>
//           {Object.keys(user).length > 0 && (
//             <Nav.Link onClick={handleUserProfile}>Watchlist</Nav.Link>
//           )}
//           <Nav>
//             <NavDropdown
//               title={Object.keys(user).length > 0 ? user.username : 'User'}
//               id='collasible-nav-dropdown'
//             >
//               {Object.keys(user).length === 0 && (
//                 <>
//                   <NavDropdown.Item>
//                     <h6 onClick={() => setModalShowR(true)}>Register</h6>
//                     <ModalForm
//                       show={modalShowR}
//                       onHide={() => setModalShowR(false)}
//                       header={'Create new account'}
//                       isRegister={true}
//                     />
//                   </NavDropdown.Item>
//                   <NavDropdown.Item>
//                     <h6 onClick={() => setModalShowL(true)}>Login</h6>
//                     <ModalForm
//                       show={modalShowL}
//                       onHide={() => setModalShowL(false)}
//                       header={'Login'}
//                       isRegister={false}
//                     />
//                   </NavDropdown.Item>
//                 </>
//               )}
//               {Object.keys(user).length > 0 && (
//                 <NavDropdown.Item onClick={handleLogout}>
//                   Logout
//                 </NavDropdown.Item>
//               )}
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
import React, { useContext, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { getMovieIfNotExistsAddsDB, logout } from '../../API';
import ModalForm from '../ModalForm/ModalForm';
import { UserContext } from '../../Hooks/userContext';
import MovieCard from '../MovieCard/MovieCard'; // Import MovieCard component

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [modalShowR, setModalShowR] = useState(false);
  const [modalShowL, setModalShowL] = useState(false);

  const handleOnChange = (e) => {
    setMovie(e.target.value);
  };

  const fetchRequest = async () => {
    try {
      const result = await getMovieIfNotExistsAddsDB(movie);
      setSearchResults([result]); // Store search results in state
    } catch (error) {
      console.error(error);
    } finally {
      setMovie('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser('');
      localStorage.clear();
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
      style={{ position: 'flex', top: '0px' }}
    >
      <Container>
        <Navbar.Brand>
          <h1>Movies Library</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Form className='d-flex'>
              <FormControl
                value={movie}
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                onChange={handleOnChange}
              />
              <Button onClick={fetchRequest} variant='outline-success'>
                Search
              </Button>
            </Form>
          </Nav>
          {Object.keys(user).length > 0 && (
            <Nav.Link onClick={() => navigate(`/user`)}>Watchlist</Nav.Link>
          )}
          <Nav>
            <NavDropdown
              title={Object.keys(user).length > 0 ? user.username : 'User'}
              id='collasible-nav-dropdown'
            >
              {Object.keys(user).length === 0 && (
                <>
                  <NavDropdown.Item>
                    <h6 onClick={() => setModalShowR(true)}>Register</h6>
                    <ModalForm
                      show={modalShowR}
                      onHide={() => setModalShowR(false)}
                      header={'Create new account'}
                      isRegister={true}
                    />
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <h6 onClick={() => setModalShowL(true)}>Login</h6>
                    <ModalForm
                      show={modalShowL}
                      onHide={() => setModalShowL(false)}
                      header={'Login'}
                      isRegister={false}
                    />
                  </NavDropdown.Item>
                </>
              )}
              {Object.keys(user).length > 0 && (
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className="mt-4">
      <Row>
        {searchResults.map((result, index) => (
          <Col key={index}>
            <MovieCard movie={result} />
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Header;
