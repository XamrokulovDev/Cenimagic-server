const { Router } = require("express");
const router = Router();
const { protected, adminStatus } = require("../middlewares/auth");
const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} = require("../controllers/movie.controller");

// GET all movies
/**
 * @swagger
 * path:
 *  /api/v1/movies:
 *    get:
 *      summary: Get all movies
 *      tags: Movies
 *      responses:
 *        200:
 *          description: A list of all movies
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                  count:
 *                    type: integer
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Movie'
 */
router.get("/", getMovies);

// GET movie by ID
/**
 * @swagger
 * path:
 *  /api/v1/movies/{id}:
 *    get:
 *      summary: Get a movie by ID
 *      tags: Movies
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the movie
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Movie details
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        404:
 *          description: Movie not found
 */
router.get("/:id", getMovieById);

// CREATE new movie
/**
 * @swagger
 * path:
 *  /api/v1/movies/create:
 *    post:
 *      summary: Create a new movie
 *      tags: Movies
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      responses:
 *        201:
 *          description: Movie created successfully
 *        400:
 *          description: Invalid input
 */
router.post("/create", protected, adminStatus, createMovie);

// UPDATE movie
/**
 * @swagger
 * path:
 *  /api/v1/movies/update/{id}:
 *    put:
 *      summary: Update movie details
 *      tags: Movies
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the movie to update
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      responses:
 *        200:
 *          description: Movie updated successfully
 *        404:
 *          description: Movie not found
 */
router.put("/update/:id", protected, adminStatus, updateMovie);

// DELETE movie
/**
 * @swagger
 * path:
 *  /api/v1/movies/delete/{id}:
 *    delete:
 *      summary: Delete a movie
 *      tags: Movies
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: The ID of the movie to delete
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Movie deleted successfully
 *        404:
 *          description: Movie not found
 */
router.delete("/delete/:id", protected, adminStatus, deleteMovie);

module.exports = router;