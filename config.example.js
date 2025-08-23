// Local development configuration template
// Copy this file to config.local.js and customize for your environment

export const localConfig = {
  // Development server settings
  devServer: {
    port: 3000,
    host: "localhost",
    open: true,
  },

  // Feature flags for development
  features: {
    enableAnalytics: false,
    enableAuth: false,
    enableBackend: false,
    debugMode: true,
  },

  // API endpoints for development
  api: {
    baseUrl: "http://localhost:8080",
    timeout: 5000,
    retries: 3,
  },

  // Local storage keys
  storage: {
    passwordHistoryKey: "dev_password_history",
    userPreferencesKey: "dev_user_preferences",
  },
};
