const config = require("../config");
const db = require("../models");
const aws = require("aws-sdk");
const e = require("express");
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
        return res
          .status(400)
          .json(400, { message: "Lỗi server, không thể upload" });
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
const getDetailFilm = async (req, res) => {
  try {
    const { maPhim } = req.params;
    const film = await db.Movies.findOne({ where: { maPhim } });
    if (!film) {
      return res.status(404).json(404, { message: "Không tìm thấy phim" });
    }
    return res.status(200).json(200, { film });
  } catch (error) {
    throw error;
  }
};
const getFilmsPagination = async (req, res) => {
  try {
    const { soTrang, soPhanTuTrenTrang } = req.body;
    const offset = (soTrang - 1) * soPhanTuTrenTrang;
    const films = await db.Movies.findAll({ offset, limit: soPhanTuTrenTrang });
    return res.status(200).json(200, { films });
  } catch (error) {
    if (error.name === "SequelizeDatabaseError")
      return res.status(200).json(200, { message: "Không tìm thấy kết quả" });
    throw error;
  }
};
const updateFilm = async (req, res) => {
  try {
    const { maPhim } = req.body;
    const film = await db.Movies.findOne({ where: { maPhim } });
    if (!film) {
      return res.status(404).json(404, { message: "Không tìm thấy phim" });
    }
    if (req.file) {
      const { buffer, originalname, mimetype } = req.file;
      const dst = `film/${Date.now()}_${originalname}`;
      const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: dst,
        Body: buffer,
        ContentType: mimetype,
      };
      s3.putObject(params, async (err, data) => {
        if (err) {
          return res
            .status(400)
            .json(400, { message: "Lỗi server, không thể upload" });
        } else {
          const url = `${config.S3_DOMAIN_NAME}/${dst}`;
          const filmUpdated = { ...req.body, hinhAnh: url };
          await db.Movies.update(filmUpdated, { where: { maPhim } });
          const result = await db.Movies.findOne({ where: { maPhim } });
          return res
            .status(201)
            .json(201, { message: "Cập nhật phim thành công!", result });
        }
      });
    } else {
      const filmUpdated = { ...req.body };
      await db.Movies.update(filmUpdated, { where: { maPhim } });
      const result = await db.Movies.findOne({ where: { maPhim } });
      return res
        .status(201)
        .json(201, { message: "Cập nhật phim thành công!", result });
    }
  } catch (error) {
    throw error;
  }
};
const deleteFilm = async (req, res) => {
  try {
    const { maPhim } = req.params;
    const film = await db.Movies.findOne({ where: { maPhim } });
    if (!film) {
      return res.status(404).json(404, { message: "Không tìm thấy phim" });
    }
    await db.Movies.destroy({ where: { maPhim } });
    return res.status(200).json(200, { message: "Xóa phim thành công!" });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addFilm,
  getAllFilms,
  getBanners,
  getDetailFilm,
  updateFilm,
  deleteFilm,
  getFilmsPagination,
};
