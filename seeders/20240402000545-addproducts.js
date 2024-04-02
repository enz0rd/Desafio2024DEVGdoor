'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('PRODUTOS', [
      {
        id: '1',
        barras: '7890123456789',
        descricao: 'Maçã',
        qtd: 50,
        valor_custo: 1.50,
        valor_venda: 2.00,
        observacoes: 'Fruta fresca',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        barras: '7890123456790',
        descricao: 'Arroz',
        qtd: 100,
        valor_custo: 2.50,
        valor_venda: 3.50,
        observacoes: 'Arroz branco, tipo longo',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        barras: '7890123456791',
        descricao: 'Paracetamol',
        qtd: 30,
        valor_custo: 5.00,
        valor_venda: 7.00,
        observacoes: 'Analgésico para dor de cabeça',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        barras: '7890123456792',
        descricao: 'Água Mineral',
        qtd: 80,
        valor_custo: 1.00,
        valor_venda: 1.50,
        observacoes: '500ml',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        barras: '7890123456793',
        descricao: 'Feijão',
        qtd: 70,
        valor_custo: 3.00,
        valor_venda: 4.00,
        observacoes: 'Tipo carioca',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        barras: '7890123456794',
        descricao: 'Coca-Cola',
        qtd: 40,
        valor_custo: 2.50,
        valor_venda: 3.00,
        observacoes: 'Lata 350ml',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        barras: '7890123456795',
        descricao: 'Banana',
        qtd: 60,
        valor_custo: 1.20,
        valor_venda: 1.80,
        observacoes: 'Banana prata',
        ativo: 0, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8',
        barras: '7890123456796',
        descricao: 'Pão de Forma',
        qtd: 90,
        valor_custo: 2.00,
        valor_venda: 2.50,
        observacoes: 'Pacote 500g',
        ativo: 0, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '9',
        barras: '7890123456797',
        descricao: 'Dipirona',
        qtd: 25,
        valor_custo: 3.50,
        valor_venda: 5.00,
        observacoes: 'Analgésico e antitérmico',
        ativo: 1, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '10',
        barras: '7890123456798',
        descricao: 'Suco de Laranja',
        qtd: 55,
        valor_custo: 4.00,
        valor_venda: 5.50,
        observacoes: 'Caixa de 1 litro',
        ativo: 0, 
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
