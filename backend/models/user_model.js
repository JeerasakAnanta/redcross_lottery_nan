// models/User.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs"); // Import bcryptjs for password hashing

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Hash the password before creating a new user
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
  });

  // Optionally, you can create a method to compare passwords
  User.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
