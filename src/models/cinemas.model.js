const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cinemas extends Model {
    static associate(models) {
      Cinemas.hasMany(models.Subcinemas, {
        foreignKey: "maCumRap",
        as: "subcinemas",
      });
      Cinemas.belongsTo(models.Cineplexes, {
        foreignKey: "maHeThongRap",
        as: "cineplexes",
      });
    }
  }
  Cinemas.init(
    {
      maCumRap: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      tenCumRap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maHeThongRap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diaChi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hinhAnh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cinemas",
      tableName: "cinemas",
      timestamps: false,
    }
  );
  return Cinemas;
};
