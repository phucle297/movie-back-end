const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cineplexes extends Model {
    static associate(models) {
      Cineplexes.hasMany(models.Cinemas, {
        foreignKey: "maHeThongRap",
        as: "cinemas",
      });
    }
  }
  Cineplexes.init(
    {
      maHeThongRap: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      tenHeThongRap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biDanh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cineplexes",
      tableName: "cineplexes",
      timestamps: false,
    }
  );
  return Cineplexes;
};
