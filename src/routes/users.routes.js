const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/users.controller");
const { authenticate, authorize } = require("../middleware/authentication");
usersRoutes.get("/lay-danh-sach-nguoi-dung", authenticate, authorize("QuanTri"), userController.getAll);
usersRoutes.post("/dang-ky", userController.register);
usersRoutes.post("/dang-nhap", userController.login);

module.exports = usersRoutes;
