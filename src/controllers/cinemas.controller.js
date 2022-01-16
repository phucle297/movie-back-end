const db = require("../models");
const aws = require("aws-sdk");
const config = require("../config");
const s3 = new aws.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});
const uploadLogo = async (req, res) => {
  const { folder, maHeThongRap, maCumRap } = req.body;
  const { buffer, originalname, mimetype } = req.file;
  let flag = true;
  const dst = `${folder}/${Date.now()}_${originalname}`;
  const params = {
    Bucket: config.S3_BUCKET_NAME,
    Key: dst,
    Body: buffer,
    ContentType: mimetype,
  };
  if (maHeThongRap && maCumRap) {
    return res.status(400).json(400, {
      message: "Chỉ có thể truyền mã hệ thống rạp hoặc mã cụm rạp",
    });
  } else if (!maHeThongRap && !maCumRap) {
    return res
      .status(400)
      .json(400, { message: "Chưa truyền mã hệ thống rạp hoặc mã cụm rạp" });
  }
  if (maHeThongRap) {
    const isCineplexExist = await db.Cineplexes.findOne({
      where: { maHeThongRap },
    });
    if (!isCineplexExist)
      return res.status(400).json(400, "Hệ thống rạp không tồn tại");
  } else {
    const isCinemaExist = await db.Cinemas.findOne({
      where: { maCumRap },
    });
    if (!isCinemaExist)
      return res.status(400).json(400, "Cụm rạp không tồn tại");
    else flag = false;
  }
  s3.putObject(params, async (err, data) => {
    if (err) {
      return res
        .status(400)
        .json(400, { message: "Lỗi server, không thể upload" });
    } else {
      const url = `${config.S3_DOMAIN_NAME}/${dst}`;
      if (flag) {
        await db.Cineplexes.update({ logo: url }, { where: { maHeThongRap } });
      } else {
        await db.Cinemas.update({ logo: url }, { where: { maCumRap } });
      }
      return res
        .status(200)
        .json(200, { message: "Tải ảnh lên thành công!", url });
    }
  });
};
const getCineplexes = async (req, res) => {
  try {
    const cineplexes = await db.Cineplexes.findAll();
    return res.status(200).json(200, cineplexes);
  } catch (error) {
    throw error;
  }
};
const getDetailCineplex = async (req, res) => {
  try {
    const { maHeThongRap } = req.body;
    if (!maHeThongRap)
      return res.status(400).json(400, "Thiếu mã hệ thống rạp");
    const cinemas = await db.Cinemas.findAll({
      where: { maHeThongRap },
    });
    return res.status(200).json(200, cinemas);
  } catch (error) {
    throw error;
  }
};

module.exports = { getCineplexes, getDetailCineplex, uploadLogo };
