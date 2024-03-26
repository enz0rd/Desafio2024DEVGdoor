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
      qtd: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      valor_custo: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      valor_venda: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0,
      },
      observacoes: {
        type: Sequelize.STRING,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PRODUTOS");
  },
};
