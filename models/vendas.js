"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VENDAS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VENDAS.belongsTo(models.USUARIOS, {
        foreignKey: "id_operador",
        as: "vendasOperador",
      });

      VENDAS.hasMany(models.ITEVENDAS, {
        foreignKey: "codigo_venda",
        as: "venda",
      });
      
      VENDAS.hasMany(models.PAGVENDAS, {
        foreignKey: "codigo_venda",
        as: "pag_venda",
      });
      // define association here
    }
  }
  VENDAS.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }, 
      NUMERO: DataTypes.INTEGER,
      DATA_EMISSAO: DataTypes.DATE,
      STATUS: DataTypes.STRING,
      valor_tot: DataTypes.FLOAT,
      id_operador: DataTypes.INTEGER,
      cancelada: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "VENDAS",
    }
  );
  return VENDAS;
};
