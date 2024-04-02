'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PAGVENDAS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PAGVENDAS.belongsTo(models.VENDAS, {
        foreignKey: 'codigo_venda',
        as: 'pag_venda'
      });
      // define association here
    }
  }
  PAGVENDAS.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo_venda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendas',
        key: 'id'
      }
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      default: 0
    }
  }, {
    sequelize,
    modelName: 'PAGVENDAS',
  });
  return PAGVENDAS;
};