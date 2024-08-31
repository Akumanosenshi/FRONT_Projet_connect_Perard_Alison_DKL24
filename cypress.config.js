const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Set to your local dev server
    setupNodeEvents(on, config) {
      // Custom Node event listeners or tasks can be added here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
});
