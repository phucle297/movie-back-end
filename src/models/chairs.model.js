const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Chairs extends Model {
    static associate(models) {
      Chairs.belongsTo(models.Subcinemas, {
        foreignKey: "maRap",
        as: "subcinemas",
      });
      Chairs.hasMany(models.Tickets, {
        foreignKey: "maGhe",
        as: "tickets",
      });
    }
  }
  Chairs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "maGhe",
      },
      tenGhe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maRap: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trangThai: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Chairs", tableName: "chairs" }
  );
  return Chairs;
};
