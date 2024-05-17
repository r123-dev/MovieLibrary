// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const MovieCard = ({ movie }) => {
//   const navigate = useNavigate();

//   const onClick = (movie) => {
//     const newTitle = movie.title.replaceAll(' ', '+');
//     navigate(`/tv=${newTitle}`, { state: { movie: movie } });
//   };
//   return (
//     <Card
//       onClick={() => onClick(movie)}
//       style={{
//         width: '18rem',
//         marginTop: '3rem',
//         height: '43rem',
//         marginBottom: '1rem',
//         cursor: 'pointer',
//       }}
//     >
//       <Card.Img variant='top' src={movie.poster} style={{ height: '24em' }} />
//       <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>Rating: {movie.imdbRating}</Card.Text>
//         <Card.Text>
//           {movie.Type} {movie.Year}
//         </Card.Text>
//         <Card.Text>{movie.Plot}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// MovieCard.propTypes = {
//   movie: PropTypes.object,
// };

// export default MovieCard;
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const onClick = (movie) => {
    const newTitle = movie.Title.replaceAll(' ', '+');
    navigate(`/tv=${newTitle}`, { state: { movie: movie } });
  };

  return (
    <Card
      onClick={() => onClick(movie)}
      style={{
        width: '18rem',
        marginTop: '3rem',
        height: '43rem',
        marginBottom: '1rem',
        cursor: 'pointer',
      }}
    >
      {movie.Poster && (
  <Card.Img variant='top' src={movie.Poster} style={{ height: '24em' }} />
)} {/* Access Poster property */}
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Rating: {movie.imdbRating}</Card.Text>
        <Card.Text>
          {movie.Type} {movie.Year}
        </Card.Text>
        <Card.Text>{movie.Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;
