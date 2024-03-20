"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VENDAS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NUMERO: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DATA_EMISSAO: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      STATUS: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_tot: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      id_operador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "USUARIOS",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("VENDAS", {
      fields: ["id_operador"],
      type: "foreign key",
      name: "FK_VENDAS_USUARIOS",
      references: {
        table: "USUARIOS",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("VENDAS", "FK_VENDAS_USUARIOS");
    await queryInterface.dropTable("VENDAS");
  },
};
