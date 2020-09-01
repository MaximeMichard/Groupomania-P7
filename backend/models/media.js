'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {

    static associate(models) {
      // define association here
    }
  };
  media.init({
    userId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    type: DataTypes.STRING,
    lien: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};