"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PRODUTOS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      barras: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      valor_venda: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      qtd: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PRODUTOS");
  },
};
