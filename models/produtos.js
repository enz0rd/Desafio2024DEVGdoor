"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PRODUTOS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PRODUTOS.hasMany(models.ITEVENDAS, {
        foreignKey: "codigo_produto",
        as: "produto",
      });
    }
  }
  PRODUTOS.init(
    {
      barras: DataTypes.STRING,
      descricao: DataTypes.STRING,
      valor_venda: DataTypes.FLOAT,
      qtd: DataTypes.FLOAT,
      ativo: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PRODUTOS",
    }
  );
  return PRODUTOS;
};
