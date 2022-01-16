const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Tickets extends Model {
    static associate(models) {
      Tickets.belongsTo(models.Showtimes, {
        foreignKey: "maLichChieu",
        as: "showtimes",
      });
      Tickets.belongsTo(models.Chairs, {
        foreignKey: "maGhe",
        as: "chairs",
      });
      Tickets.belongsTo(models.Users, {
        foreignKey: "email",
        as: "users",
      });
    }
  }
  Tickets.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "maVe",
      },
      maLichChieu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maGhe: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
      tableName: "tickets",
      initialAutoIncrement: 10000,
    }
  );
  return Tickets;
};
