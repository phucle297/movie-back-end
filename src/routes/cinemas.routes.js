const express = require("express");
const cinemasController = require("../controllers/cinemas.controller");
const { authenticate } = require("../middleware/authentication");
const cinemasRoutes = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
cinemasRoutes.post(
  "/upload-logo",
  upload.single("file"),
  authenticate,
  cinemasController.uploadLogo
);
cinemasRoutes.get(
  "/lay-thong-tin-he-thong-rap",
  cinemasController.getCineplexes
);
cinemasRoutes.get(
  "/lay-thong-tin-cum-rap-theo-he-thong",
  cinemasController.getDetailCineplex
);

module.exports = cinemasRoutes;
