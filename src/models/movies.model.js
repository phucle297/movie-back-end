const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Movies extends Model {
    static associate(models) {
      Movies.hasMany(models.Showtimes, {
        foreignKey: "maPhim",
        as: "showtimes",
      });
    }
  }
  Movies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "maPhim",
      },
      tenPhim: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biDanh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trailer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hinhAnh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moTa: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
      ngayKhoiChieu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      danhGia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      dangChieu: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      sapChieu: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Movies",
      tableName: "movies",
      initialAutoIncrement: 1000,
    }
  );
  return Movies;
};
