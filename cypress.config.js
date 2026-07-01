const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  e2e: {
    baseUrl: "https://kitapsepeti.com",

    setupNodeEvents(on, config) {
    },
  },
});