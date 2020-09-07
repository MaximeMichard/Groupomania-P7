'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    
    static associate(models) {
      models.post.belongsTo(models.User, {
        foreignKey:{
          allowNull: false,
          name: 'UserId',
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      })
      models.post.hasMany(models.commentaire,{ onDelete: 'cascade',
      hooks: true })
      models.post.hasMany(models.media)
    }
  };
  post.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};