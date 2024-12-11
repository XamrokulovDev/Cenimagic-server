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

const upload = require("../utils/fileUpload");

// Barcha filmlarni olish
router.get("/", getMovies);

// ID bo‘yicha filmni olish
router.get("/:id", getMovieById);

// Yangi film qo‘shish
router.post(
    "/create",
    protected,
    adminStatus,
    upload.single("video"),
    createMovie
);

// Filmni yangilash
router.put(
    "/update/:id",
    protected,
    adminStatus,
    upload.single("video"),
    updateMovie
);

// Filmni o‘chirish
router.delete("/delete/:id", protected, adminStatus, deleteMovie);

module.exports = router;