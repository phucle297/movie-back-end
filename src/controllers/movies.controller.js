const config = require("../config");
const db = require("../models");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});
const addFilm = async (req, res) => {
  try {
    const { buffer, originalname, mimetype } = req.file;
    let film;
    const dst = `film/${Date.now()}_${originalname}`;
    const params = {
      Bucket: config.S3_BUCKET_NAME,
      Key: dst,
      Body: buffer,
      ContentType: mimetype,
    };
    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const url = `${config.S3_DOMAIN_NAME}/${dst}`;
        film = { ...req.body, hinhAnh: url };
        await db.Movies.create(film);
        return res
          .status(201)
          .json(201, { message: "Thêm phim thành công!", film });
      }
    });
  } catch (error) {
    throw error;
  }
};
const getAllFilms = async (req, res) => {
  try {
    const films = await db.Movies.findAll();
    return res.status(200).json(200, { films });
  } catch (error) {
    throw error;
  }
};
const getBanners = async (req, res) => {
  try {
    const films = await db.Movies.findAll({ offset: 3, limit: 3 });
    return res.status(200).json(200, { films });
  } catch (error) {
    throw error;
  }
};
module.exports = { addFilm, getAllFilms, getBanners };
