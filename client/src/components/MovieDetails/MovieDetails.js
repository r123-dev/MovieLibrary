// import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Row, Col, Badge, Button } from 'react-bootstrap';
// import Rating from '../Rating/Rating';
// import Posts from '../Posts/Posts';

// import { getSession, updateUser } from '../../API';
// import { UserContext } from '../../Hooks/userContext';

// const MovieDetails = () => {
 
//   const { movie } = {
//     movie: useLocation().state.movie,
//   };
//   const { user, setUser } = useContext(UserContext);
//   const types = movie.genre.split(',');

//   const handleAddToWatchlist = async () => {
//     try {
//       await updateUser({ title: movie._id });
//       setUser(await getSession());
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Row
//         className='row d-flex justify-content-center'
//         style={{
//           marginTop: '3rem',
//         }}
//       >
//         <Col>
//           <h1>{movie.Title}</h1>
//           <h6>
//             {movie.Type} {movie.Year}
//           </h6>
//           <img src={movie.Poster} />
//           <Col style={{ marginTop: '1rem' }}>
//             {types &&
//               types.map((type, i) => {
//                 return (
//                   <Badge
//                     style={{ marginRight: '1rem' }}
//                     key={i}
//                     pill
//                     bg='primary'
//                   >
//                     {type}
//                   </Badge>
//                 );
//               })}
//           </Col>
//         </Col>
//         <Col>
//           <Col
//             className='row d-flex justify-content-center'
//             style={{ width: '50rem', marginTop: '5rem', marginLeft: '-15rem' }}
//           >
//             <h2>Rating: {movie.imdbRating}/10</h2>
//             <Rating rate={parseFloat(movie.imdbRating)} />
//             {movie.Plot}
//             Writer: {movie.Writer}
//             Actors: {movie.Actors}
//             {Object.keys(user).length > 0 &&
//             !user.watchlist.includes(movie._id) ? (
//               <Button onClick={handleAddToWatchlist}>Add to watchlist</Button>
//             ) : null}
//           </Col>
//         </Col>
//         <Row>
//           <Posts title={movie.title} />
//         </Row>
//       </Row>
//     </>
//   );
// };

// export default MovieDetails;
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import Rating from '../Rating/Rating';
import Posts from '../Posts/Posts';
import { getSession, updateUser } from '../../API';
import { UserContext } from '../../Hooks/userContext';

const MovieDetails = () => {
  const { movie } = useLocation().state; // Extract movie from location state
  const { user, setUser } = useContext(UserContext);
  const types = movie.Genre.split(','); // Genre is an array, so access it using dot notation

  const handleAddToWatchlist = async () => {
    try {
      await updateUser({ title: movie.imdbID }); // Use imdbID as the identifier
      setUser(await getSession());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row
        className='row d-flex justify-content-center'
        style={{
          marginTop: '3rem',
        }}
      >
        <Col>
          <h1>{movie.Title}</h1>
          <h6>
            {movie.Type} {movie.Year}
          </h6>
          <img src={movie.Poster} alt={movie.Title} /> {/* Provide alt text for accessibility */}
          <Col style={{ marginTop: '1rem' }}>
            {types &&
              types.map((type, i) => {
                return (
                  <Badge
                    style={{ marginRight: '1rem' }}
                    key={i}
                    pill
                    bg='primary'
                  >
                    {type.trim()} {/* Trim to remove any leading/trailing spaces */}
                  </Badge>
                );
              })}
          </Col>
        </Col>
        <Col>
          <Col
            className='row d-flex justify-content-center'
            style={{ width: '50rem', marginTop: '5rem', marginLeft: '-15rem' }}
          >
            <h2>Rating: {movie.imdbRating}/10</h2>
            <Rating rate={parseFloat(movie.imdbRating)} />
            {movie.Plot}
            Writer: {movie.Writer}
            Actors: {movie.Actors}
            {Object.keys(user).length > 0 &&
            !user.watchlist.includes(movie.imdbID) ? ( // Use imdbID as the identifier
              <Button onClick={handleAddToWatchlist}>Add to watchlist</Button>
            ) : null}
          </Col>
        </Col>
        <Row>
          <Posts title={movie.Title} /> {/* Pass the movie title */}
        </Row>
      </Row>
    </>
  );
};

export default MovieDetails;
