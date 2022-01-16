const express = require("express");
const moviesRoutes = express.Router();
const moviesController = require("../controllers/movies.controller");
const { authenticate, authorize } = require("../middleware/authentication");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

moviesRoutes.post(
  "/them-phim",
  upload.single("hinhAnh"),
  authenticate,
  authorize("QuanTri"),
  moviesController.addFilm
);
moviesRoutes.get("/lay-danh-sach-phim", moviesController.getAllFilms);
moviesRoutes.get("/lay-danh-sach-banners", moviesController.getBanners);

module.exports = moviesRoutes;
