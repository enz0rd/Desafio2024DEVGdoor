"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ITEVENDAS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ITEVENDAS.belongsTo(models.VENDAS, {
        foreignKey: "codigo_venda",
        as: "venda",
      });
      ITEVENDAS.belongsTo(models.PRODUTOS, {
        foreignKey: "codigo_produto",
        as: "produto",
      });
      // define association here
    }
  }
  ITEVENDAS.init(
    {
      codigo_venda: DataTypes.INTEGER,
      codigo_produto: DataTypes.INTEGER,
      valor_un: DataTypes.FLOAT,
      valor_tot: DataTypes.FLOAT,
      qtd: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ITEVENDAS",
    }
  );
  return ITEVENDAS;
};
