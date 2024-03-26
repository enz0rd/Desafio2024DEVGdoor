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
      valor_custo: DataTypes.FLOAT,
      valor_venda: DataTypes.FLOAT,
      observacoes: DataTypes.STRING,
      qtd: DataTypes.FLOAT,
      ativo: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PRODUTOS",
    }
  );
  return PRODUTOS;
};
