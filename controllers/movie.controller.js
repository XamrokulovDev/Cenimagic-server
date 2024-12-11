const Movies = require("../models/movie.model");
const asyncHandle = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getMovies = asyncHandle(async (req, res, next) => {
    const movies = await Movies.find();
    res.status(200).json({
        success: true,
        count: movies.length,
        data: movies,
    });
});

exports.getMovieById = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const movie = await Movies.findById(id);
    if (!movie) {
        return next(new ErrorResponse(`No movie found with id ${id}!`, 404));
    }
    res.status(200).json({
        success: true,
        data: movie,
    });
});

exports.createMovie = asyncHandle(async (req, res, next) => {
    const { title, description, genre, year, rating, episodes } = req.body;
    if(!title || !description || !genre || !year || !rating ){
        return next(new ErrorResponse('Please provide all required fields', 400));
    }
    if (!req.file) {
        return next(new ErrorResponse('Video file is required!', 400));
    }
    const videoPath = `/uploads/${req.file.filename}`;

    const movies = await Movies.create({ title, description, genre, year, rating, episodes, video: videoPath });
    res.status(201).json({
        success: true,
        data: movies,
    });
});

exports.updateMovie = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    console.log("ID from URL:", id);
    if (!id) {
        return next(new ErrorResponse("No ID provided in the URL!", 400));
    }
    const { title, description, genre, year, rating, episodes } = req.body;

    if (!req.file) {
        return next(new ErrorResponse('Video file is required!', 400));
    }
    const videoPath = `/uploads/${req.file.filename}`;

    let movie = await Movies.findById(id);
    if (!movie) {
        return next(new ErrorResponse(`No movie found with id ${id}!`, 404));
    }
    movie = await Movies.findByIdAndUpdate(
        id,
        { title, description, genre, year, rating, episodes, video: videoPath },
        { new: true }
    );
    res.status(200).json({
        success: true,
        data: movie,
    });
});

exports.deleteMovie = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const movie = await Movies.findById(id);
    if (!movie) {
        return next(new ErrorResponse(`No movie found with id ${id}!`, 404));
    }
    await movie.deleteOne();
    res.status(200).json({
        success: true,
        message: `Movie with id ${id} successfully deleted!`,
    });
});