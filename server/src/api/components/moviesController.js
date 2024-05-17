const mongoose = require('mongoose');
const axios = require('axios');
const movieSchema = require('../models/movie');

const Movie = mongoose.model('Movie', movieSchema.schema);

/**
 * Responsible for getting the movies
 * @param {*} _
 * @param {Object} res - Response Object
 * @returns
 */
async function getMovies(_, res) {
  try {
    const result = await Movie.find();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
}

/**
 * Responsible for fetching a movie by its id
 * @param {Object} req - Request object
 * @param {Object} req.params - Request object params
 * @param {Object} req.params.id - Movie's id
 * @param {Object} res - Response object
 * @returns
 */
async function getMovieById(req, res) {
  try {
    const m = await Movie.findById(req.params.id);
    return res.status(200).json({
      m,
    });
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}
/**
 * Responsible for fetching a list of movies by their id
 * @param {Object} req - Request object
 * @param {Object} req.body - Request object body
 * @param {Array} req.body.movieArray - Array with the titles id
 * @param {Object} res - Response object
 * @returns
 */
async function getMoviesWithArray(req, res) {
  const filter = { _id: { $in: req.body.movieArray } };

  try {
    const m = await Movie.find(filter);
    return res.status(200).json(m);
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

/**
 * Responsible for searching a title, if it doesn't exist in the system adds it
 * @param {Object} req - Request object
 * @param {Object} req.params - Request object params
 * @param {String} req.params.name - Name of the movie
 * @param {Object} res - Response object
 * @returns
 */
async function getMovieIfNotExistsAddsDB(req, res) {
  try {
    const m = await Movie.find({
      title: { $regex: req.params.name },
    });
    if (m.length > 0) {
      return res.json(m);
    }
    const baseUrl = `https://www.omdbapi.com/?t=${req.params.name}&plot=short&apikey=${process.env.API_KEY}`;
    const result = await axios.get(baseUrl);
    const newMovieObj = {
      title: result.data.Title,
      year: result.data.Year,
      released: result.data.Released,
      genre: result.data.Genre,
      plot: result.data.Plot,
      poster: result.data.Poster,
      rating: result.data.imdbRating,
      type: result.data.Type,
      totalSeasons: result.data.totalSeasons,
      writer: result.data.Writer,
      actors: result.data.Actors,
    };
    await Movie.insertMany(newMovieObj);
    return res.json(newMovieObj);
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getMovieIfNotExistsAddsDB,
  getMoviesWithArray,
};
