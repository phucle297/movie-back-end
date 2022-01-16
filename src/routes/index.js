const express = require("express");
const rootRouter = express.Router();

rootRouter.use("/quan-ly-rap", require("./cinemas.routes"));
rootRouter.use("/quan-ly-phim", require("./movies.routes"));
rootRouter.use("/quan-ly-nguoi-dung", require("./users.routes"));
rootRouter.use("/quan-ly-dat-ve", require("./bookingTickets.routes"));

module.exports = rootRouter;
