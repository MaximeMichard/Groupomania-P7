'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    static associate() {
      post.associate = function (models) {
        models.post.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  };
  post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};