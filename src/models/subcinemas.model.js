const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Subcinemas extends Model {
    static associate(models) {
      Subcinemas.hasMany(models.Chairs, {
        foreignKey: "maRap",
        as: "chairs",
      });
      Subcinemas.belongsTo(models.Cinemas, {
        foreignKey: "maCumRap",
        as: "cinemas",
      });
      Subcinemas.hasMany(models.Showtimes, {
        foreignKey: "maRap",
        as: "showtimes",
      });
    }
  }
  Subcinemas.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "maRap",
      },
      tenRap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maCumRap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Subcinemas",
      tableName: "subcinemas",
      timestamps: false,
      initialAutoIncrement: 500,
    }
  );
  return Subcinemas;
};
