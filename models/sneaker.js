'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sneaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sneaker.init({
    name: DataTypes.STRING,
    styleID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sneaker',
  });
  return sneaker;
};