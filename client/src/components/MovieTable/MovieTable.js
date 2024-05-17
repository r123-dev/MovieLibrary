import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function MovieTable({ movie }) {
  return (
    <>
      <Col style={{ maxWidth: '200px' }}>
        <img
          src={movie.poster}
          style={{ maxHeight: '200px', maxWidth: '130px' }}
        />
      </Col>
      <Col style={{ maxWidth: '900px', textAlign: 'left' }}>
        <h5>{movie.Title}</h5>
        <h6>{movie.Year}</h6>
        <h6>{movie.Ratings}</h6>
        <p>{movie.Actors.replaceAll(',', '|')}</p>
        <p>{movie.Plot}</p>
      </Col>
    </>
  );
}

MovieTable.propTypes = {
  movie: PropTypes.object,
};

export default MovieTable;
