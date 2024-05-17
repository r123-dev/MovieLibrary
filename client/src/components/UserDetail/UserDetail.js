// import React, { useContext, useState, useEffect } from 'react';
// import { Tab, Tabs, Row, Col, Button } from 'react-bootstrap';
// import { UserContext } from '../../Hooks/userContext';
// import { getMoviesWithArray, getSession, removeFromWatchlist } from '../../API';
// import UserCard from '../UserCard/UserCard';
// import MovieTable from '../MovieTable/MovieTable';
// import { useNavigate } from 'react-router';

// function UserDetail() {
//   const [key, setKey] = useState('movies');
//   const [movies, setMovies] = useState('');
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     getSession().then((res) => setUser(res));

//     const fetchData = async () => {
//       try {
//         const response = await getMoviesWithArray(user.watchlist);
//         return setMovies(response);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const navigate = useNavigate();

//   const handleRowClick = (movie) => {
//     const newTitle = movie.title.replaceAll(' ', '+');
//     navigate(`/tv=${newTitle}`, { state: { movie: movie } });
//   };

//   const handleRemoveFromWatchlist = async (title) => {
//     try {
//       await removeFromWatchlist(title);
//       const userUpdated = { ...user };
//       userUpdated.watchlist.filter((item) => item.title != title);
//       setMovies((current) => current.filter((item) => item._id != title));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
//       >
//         <Tabs
//           id='controlled-tab-example'
//           activeKey={key}
//           onSelect={(k) => setKey(k)}
//           className='mb-3'
//         >
//           <Tab eventKey='movies' title='Titles Watched'></Tab>

//           <Tab eventKey='profile' title='Profile'></Tab>
//         </Tabs>
//       </div>

//       {key === 'profile' && (
//         <div>
//           <UserCard />
//         </div>
//       )}

//       {key === 'movies' && (
//         <>
//           <div>{movies.length} Titles</div>
//           {movies &&
//             movies.map((movie, id) => {
//               return (
//                 <Row
//                   key={id}
//                   className='row d-flex justify-content-center'
//                   style={{ marginTop: '1rem' }}
//                   cursor='pointer'
//                   onClick={() => handleRowClick(movie)}
//                 >
//                   <hr></hr>
//                   <MovieTable key={id + movie._id} movie={movie} />
//                   <Col
//                     key={movie + id}
//                     style={{
//                       maxWidth: '225px',
//                       textAlign: 'left',
//                       marginTop: '4rem',
//                     }}
//                   >
//                     <Button
//                       onClick={() => handleRemoveFromWatchlist(movie._id)}
//                       key={movie.title + id}
//                     >
//                       Remove from watchlist
//                     </Button>
//                   </Col>
//                 </Row>
//               );
//             })}
//         </>
//       )}
//     </>
//   );
// }

// export default UserDetail;
import React, { useContext, useState, useEffect } from 'react';
import { Tab, Tabs, Row, Col, Button } from 'react-bootstrap';
import { UserContext } from '../../Hooks/userContext';
import { getMoviesWithArray,  getSession,  removeFromWatchlist } from '../../API';
import UserCard from '../UserCard/UserCard';
import MovieTable from '../MovieTable/MovieTable';
import { useNavigate } from 'react-router';

function UserDetail() {
  const [key, setKey] = useState('movies');
  const [movies, setMovies] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        
          const logoutUser = await getSession()
          
      
        const res = await logoutUser;
        setUser(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSession();
  }, [setUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.watchlist) {
        try {
          const response = await getMoviesWithArray(user.watchlist);
          setMovies(response);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleRowClick = (movie) => {
    const newTitle = movie.title.replaceAll(' ', '+');
    navigate(`/tv=${newTitle}`, { state: { movie: movie } });
  };

  const handleRemoveFromWatchlist = async (title) => {
    try {
      await removeFromWatchlist(title);
      const updatedUser = { ...user };
      updatedUser.watchlist = updatedUser.watchlist.filter((item) => item.title !== title);
      setUser(updatedUser);
      setMovies((current) => current.filter((item) => item._id !== title));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Tabs id='controlled-tab-example' activeKey={key} onSelect={(k) => setKey(k)} className='mb-3'>
          <Tab eventKey='movies' title='Titles Watched'></Tab>
          <Tab eventKey='profile' title='Profile'></Tab>
        </Tabs>
      </div>

      {key === 'profile' && (
        <div>
          <UserCard />
        </div>
      )}

      {key === 'movies' && (
        <>
          <div>{movies.length} Titles</div>
          {movies.length > 0 &&
            movies.map((movie, id) => (
              <Row
                key={id}
                className='row d-flex justify-content-center'
                style={{ marginTop: '1rem' }}
                cursor='pointer'
                onClick={() => handleRowClick(movie)}
              >
                <hr></hr>
                <MovieTable key={id + movie._id} movie={movie} />
                <Col
                  key={movie + id}
                  style={{
                    maxWidth: '225px',
                    textAlign: 'left',
                    marginTop: '4rem',
                  }}
                >
                  <Button onClick={() => handleRemoveFromWatchlist(movie._id)} key={movie.title + id}>
                    Remove from watchlist
                  </Button>
                </Col>
              </Row>
            ))}
        </>
      )}
    </>
  );
}

export default UserDetail;
