// import React, { useEffect, useState } from 'react';
// import MovieCard from '../MovieCard/MovieCard';
// // import { getMovies } from '../../API';
// import { Col, Row } from 'react-bootstrap';

// const CardWrapper = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     return () => {
//       const fetchMovies = async () => {
//         try {
//           const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=822cad9e`);
//           console.log(response);
//           return setMovies(response);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       fetchMovies();
//     };
//   }, []);

//   return (
//     <Row className='row d-flex justify-content-center'>
      
//       {movies.map((m, i) => {
//         return (
//           <Col key={m + i}>
//             <MovieCard key={i} movie={m} />
//           </Col>
//         );
//       })}
//     </Row>
//   );
// };

// export default CardWrapper;
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Col, Row } from 'react-bootstrap';

const CardWrapper = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=822cad9e`);
        const data = await response.json(); // Extract JSON data from the response
        setMovies([data]); // Update state with the extracted data
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();

    // Clean-up function removed because it's unnecessary in this case
  }, []);

  return (
    <Row className='row d-flex justify-content-center'>
      {movies.map((movie, index) => (
        <Col key={index}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};

export default CardWrapper;
