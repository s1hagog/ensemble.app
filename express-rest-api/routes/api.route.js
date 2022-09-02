const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const ApiError = require('../lib/errors/ApiError');
const { isInt, isFloat } = require('../utils/validation');
const prisma = new PrismaClient();

// Constants 
const posterRegex = /^https:\/\//i;
const imdbRegex = /^tt[0-9]{7}$/;
// current year + 5 years is a random value i have selected for a check.
const yearFutureLimit = Number(new Date().getFullYear()) + 5;
// 1899 is a random value i selected for a check
const yearPastLimit = 1899;

// A GET request to gather all movies in the DB
router.get('/movies', async (req, res, next) => {
  try {
    // Limit to only 20 movies, so we dont break things if our DB is large.
    const movies = await prisma.movies.findMany({
      take: 20
    });

    if (movies.length === 0 || movies === null) {
      throw new ApiError('No movies found in the database');
    }

    res.json(movies);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).send(error.message);
    } else {
      next(error);
    }
  }
});

router.get('/movies/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    id = Number(id);

    if (isNaN(id) || isFloat(id)) {
      throw new ApiError('ID must be an integer');
    } else if (id <= 0) {
      throw new ApiError('ID must be a positive integer')
    }

    console.log(id);

    const movie = await prisma.movies.findUnique({
      where: {
        id,
      }
    });

    if (movie === null) {
      throw new ApiError('No movie found with this ID');
    }

    res.json(movie);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).send(error.message);
    } else {
      next(error);
    }
  }
});

router.post('/movies', async (req, res, next) => {
  try {

    // Validating for empty values in request where applicable
    if (req.body.imdbID === '' || req.body.imdbID === null || req.body.imdbID === undefined) {
      throw new ApiError('imdbID must be present');
    } else if (req.body.name === '' || req.body.name === null || req.body.name === undefined) {
      throw new ApiError('movie name must be present');
    } else if (req.body.year === '' || req.body.year === null || req.body.year === undefined) {
      throw new ApiError('movie year must be present');
    }

    // Second layer of validation for particular requirements
    // imdbID validation
    const imdbIDFound = req.body.imdbID.match(imdbRegex);
    if (imdbIDFound === null) {
      throw new ApiError('imdbID must be according to format "tt1234567"');
    }

    // movie release year validation
    req.body.year = Number(req.body.year);
    if (!isInt(req.body.year)) {
      throw new ApiError('movie release year must be an integer');
    } else if (req.body.year < yearPastLimit) {
      throw new ApiError('movie release year can not be that far ago');
    } else if (req.body.year > yearFutureLimit) {
      throw new ApiError('movie release year can not be that far ahead');
    }

    // movie poster validation
    if (req.body.poster !== undefined) {
      const posterFound = req.body.poster.match(posterRegex);
      if (posterFound === null) {
        throw new ApiError('poster must be a https link');
      }
    }

    // movie description validation
    if (req.body.description !== undefined) { // movie description validation
      if (req.body.description === '') {
        throw new ApiError('movie description cant be empty');
      }
    }

    // Check for duplicated imdbID
    const duplicatedMovie = await prisma.movies.findUnique({
      where: {
        imdbID: req.body.imdbID
      }
    });
    if (duplicatedMovie !== null) {
      throw new ApiError('Movie with this imdbID already exists');
    }

    const movie = await prisma.movies.create({
      data: req.body
    })
    res.json(movie);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).send(error.message);
    } else {
      next(error);
    }
  }
});

router.delete('/movies/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    id = Number(id);

    // Check for ID value
    if (isNaN(id) || isFloat(id)) {
      throw new ApiError('ID must be an integer');
    } else if (id <= 0) {
      throw new ApiError('ID must be a positive integer')
    }
    // Check if movie exists, otherwise prisma throws 500 error
    const movieForDelete = await prisma.movies.findUnique({
      where: {
        id
      }
    });
    if (movieForDelete === null) {
      throw new ApiError('No movie found with this ID');
    }


    const deletedMovie = await prisma.movies.delete({
      where: {
        id
      }
    })

    res.json(deletedMovie);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).send(error.message);
    } else {
      next(error);
    }
  }
});

router.patch('/movies/:id', async (req, res, next) => {
  try {
    let { id } = req.params;

    id = Number(id);

    // Check for ID value
    if (isNaN(id) || isFloat(id)) {
      throw new ApiError('ID must be an integer');
    } else if (id <= 0) {
      throw new ApiError('ID must be a positive integer')
    }
    // Check if movie exists, otherwise prisma throws 500 error
    const movieForUpdate = await prisma.movies.findUnique({
      where: {
        id
      }
    });
    if (movieForUpdate === null) {
      throw new ApiError('No movie found with this ID');
    }


    //Now validate the incoming data
    if (req.body.imdbID !== undefined) { // imdbID validation

      const imdbIDFound = req.body.imdbID.match(imdbRegex);
      if (imdbIDFound === null) {
        throw new ApiError('imdbID must be according to format "tt1234567"');
      }
    }
    if (req.body.name !== undefined) { // movie name validation
      if (req.body.name === '') {
        throw new ApiError('movie name cant be empty');
      }
    }
    if (req.body.year !== undefined) { // release year validation
      req.body.year = Number(req.body.year);
      if (!isInt(req.body.year)) {
        throw new ApiError('movie release year must be an integer');
      } else if (req.body.year < yearPastLimit) {
        throw new ApiError('movie release year can not be that far ago');
      } else if (req.body.year > yearFutureLimit) {
        throw new ApiError('movie release year can not be that far ahead');
      }
    }
    if (req.body.description !== undefined) { // movie description validation
      if (req.body.description === '') {
        throw new ApiError('movie description cant be empty');
      }
    }
    if (req.body.poster !== undefined) { // movie poster validation
      const posterFound = req.body.poster.match(posterRegex);
      if (posterFound === null) {
        throw new ApiError('poster must be a https link');
      }
    }

    const movie = await prisma.movies.update({
      where: {
        id
      },
      data: req.body
    })
    res.json(movie);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).send(error.message);
    } else {
      next(error);
    }
  }
});

module.exports = router;
