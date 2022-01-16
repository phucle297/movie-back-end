const Sequelize = require("sequelize");
const config = require("../config");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const sequelize = new Sequelize(
  config.DATABASE,
  config.USERNAME,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
    port: config.PORT,
  }
);

const db = {};
//! Sequelize chỉ chạy khi đã có sẵn db, vì vậy dùng mysql2 để tạo db nếu chưa tồn tại
mysql
  .createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
  })
  .then((connection) =>
    connection
      .query(`CREATE DATABASE IF NOT EXISTS \`${config.DATABASE}\`;`)
      .then(async () => {
        const basename = path.basename(__filename);
        fs.readdirSync(__dirname)
          .filter((file) => {
            return (
              file.indexOf(".") !== 0 &&
              file.slice(-3) === ".js" &&
              file !== basename
            );
          })
          .forEach((file) => {
            const model = require(path.join(__dirname, file))(sequelize);
            db[model.name] = model;
          });

        Object.keys(db).forEach((model) => {
          if (db[model].associate) {
            db[model].associate(db);
          }
        });
        db.sequelize = sequelize;
        sequelize.sync({ alter: true });
      })
  );
module.exports = db;
