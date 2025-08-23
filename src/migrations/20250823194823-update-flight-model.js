'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // remove unique constraint from flightNumber --> Flights
    await queryInterface.removeIndex('Flights', 'flightNumber');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addIndex('Flights', ['flightNumber'], {
      unique: true,
      name: 'flightNumber'
    })
  }
};
