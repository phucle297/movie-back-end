const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Showtimes extends Model {
    static associate(models) {
      Showtimes.belongsTo(models.Movies, {
        foreignKey: "maPhim",
        as: "movies",
      });
      Showtimes.belongsTo(models.Subcinemas, {
        foreignKey: "maRap",
        as: "subcinemas",
      });
      Showtimes.hasMany(models.Tickets, {
        foreignKey: "maLichChieu",
        as: "tickets",
      });
    }
  }
  Showtimes.init(
    {
      maLichChieu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      maRap: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maPhim: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ngayChieuGioChieu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      giaVe: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      thoiLuong: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Showtimes", tableName: "showtimes" }
  );
  return Showtimes;
};
