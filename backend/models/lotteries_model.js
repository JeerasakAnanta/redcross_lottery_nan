/**
 * Defines the Lottery model
 * @param {Sequelize} sequelize - Sequelize instance
 * @param {DataTypes} DataTypes - Sequelize data types
 * @returns {Model} Lottery model
 */

module.exports = (sequelize, DataTypes) => {
  const Lottery = sequelize.define(
    "lottery",
    {
      lottery_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reward_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Lottery;
};
