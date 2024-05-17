import React from 'react';
import Ratings from 'react-ratings-declarative';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { rate, maxRate } = props;
  return (
    <Ratings rating={rate} widgetDimensions='2rem' widgetSpacings='10px'>
      {new Array(maxRate).fill().map((_, i) => {
        return <Ratings.Widget key={i} widgetRatedColor='black' />;
      })}
    </Ratings>
  );
};

Rating.defaultProps = {
  maxRate: 10,
};

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
  maxRate: PropTypes.number,
};

export default Rating;
