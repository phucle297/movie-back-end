const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Tickets, {
        foreignKey: "email",
        as: "tickets",
      });
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          isEmail: true,
        },
      },
      taiKhoan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matKhau: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          //? Use bcrypt to hash the password
          const hashedPassword = bcrypt.hashSync(value, 12);
          this.setDataValue("matKhau", hashedPassword);
        },
      },
      hoTen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      soDt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maLoaiNguoiDung: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "KhachHang",
      },
    },
    { sequelize, modelName: "Users", tableName: "users" }
  );
  return Users;
};
