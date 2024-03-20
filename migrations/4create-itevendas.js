"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ITEVENDAS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      codigo_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PRODUTOS",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      valor_un: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      valor_tot: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      qtd: {
        type: Sequelize.FLOAT,
        allowNull: false,
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

    await queryInterface.addConstraint("ITEVENDAS", {
      fields: ["codigo_venda"],
      type: "foreign key",
      name: "FK_ITEVENDAS_VENDAS",
      references: {
        table: "VENDAS",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("ITEVENDAS", {
      fields: ["codigo_produto"],
      type: "foreign key",
      name: "FK_ITEVENDAS_PRODUTOS",
      references: {
        table: "PRODUTOS",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("ITEVENDAS", "FK_ITEVENDAS_PRODUTOS");
    await queryInterface.removeConstraint("ITEVENDAS", "FK_ITEVENDAS_VENDAS");
    await queryInterface.removeConstraint("ITEVENDAS", "FK_ITEVENDAS_USUARIOS");
    await queryInterface.dropTable("ITEVENDAS");
  },
};
