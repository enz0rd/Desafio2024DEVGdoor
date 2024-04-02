"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class USUARIOS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      USUARIOS.hasMany(models.VENDAS, {
        foreignKey: "id_operador",
        as: "operadorVendas",
      });
    }
  }
  USUARIOS.init(
    {
      nome: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "USUARIOS",
    }
  );
  return USUARIOS;
};
