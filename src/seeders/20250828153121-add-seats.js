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

    const objs = [];

    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 6; j++)
      {
        objs.push({
          airplaneId: 3,
          row: i + 1,
          col: String.fromCharCode(65 + j),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('Seats', objs);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Seats', { airplaneId: 3 })
  }
};
