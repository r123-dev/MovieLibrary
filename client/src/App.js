import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import { UserContext } from './Hooks/userContext';

import Header from './components/Header/Header';
import CardWrapper from './components/CardWrapper/CardWrapper';
import MovieDetails from './components/MovieDetails/MovieDetails';
import UserDetail from './components/UserDetail/UserDetail';
import { getSession } from './API';

function App() {
  const [user, setUser] = useState({});
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    return () => {
      const isLoggedIn = localStorage.getItem('loggedIn');
      if (isLoggedIn) {
        getSession().then((res) => setUser(res));
      }
    };
  }, []);

  return (
    <div className='App'>
      <Router>
        <UserContext.Provider value={providerValue}>
          <Header />

          <Routes>
            <Route
              path='/'
              element={
                <Container>
                  
                  <CardWrapper />
                </Container>
              }
            ></Route>
            
            <Route path={`/tv/:title`} element={<MovieDetails />}></Route>
            {Object.keys(user).length > 0 && (
              <Route path={`/user`} element={<UserDetail />}></Route>
            )}
            <Route path={`*`} element={<h1>404. Page not found!</h1>}></Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
