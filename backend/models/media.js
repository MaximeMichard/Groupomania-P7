'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {

    static associate(models) {
      models.media.belongsTo(models.post, {
        foreignKey: {
          allowNull: false
        }
      })
      models.media.belongsTo(models.commentaire, {
        foreignKey: {
          allowNull: false,
        }
      })
    }
  };
  media.init({
    postId: DataTypes.INTEGER,
    commentaireId: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    type: DataTypes.STRING,
    lien: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};