'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagvendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo_venda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "VENDAS",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      especie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint("PAGVENDAS", {
      fields: ["codigo_venda"],
      type: "foreign key",
      name: "FK_PAGVENDAS_VENDAS",
      references: {
        table: "VENDAS",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pagvendas');
  }
};