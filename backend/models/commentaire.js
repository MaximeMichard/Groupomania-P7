'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.commentaire.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
      models.commentaire.belongsTo(models.post,{
        foreignKey:{
          allowNull: false
        }
      })
      models.commentaire.hasMany(models.media);
    }
  };
  commentaire.init({
    userId: DataTypes.INTEGER,
    commentaireId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentaire',
  });
  return commentaire;
};