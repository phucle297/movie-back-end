const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");
const reponseInterceptor = require("./middleware/interceptors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(reponseInterceptor);
app.use("/api", rootRouter);

app.listen(8080);
