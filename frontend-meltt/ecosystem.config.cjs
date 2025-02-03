module.exports = {
  apps: [
    {
      name: "frontendEduflex", 
      script: "npm run start",
      args: "start",
      cwd: "./",
      interpreter: "none",
      env: {
        NODE_ENV: "development",
        VITE_AUTH_API_URL: "http://localhost:5002/api",
        VITE_ACADEMIC_API_URL: "http://localhost:5001/api",
        VITE_AI_API_URL: "http://localhost:5003/api",
        VITE_ENVIRONMENT: "production",
        VITE_IAWALKER_API_ENDPOINT:
          "https://api.ia-walker.com.br/rest/v1/agents/670e8755ce7ecf43a5881034/chats",
        VITE_IAWALKER_API_KEY:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU5NGYxNTViZjBlYjZkNTQ5MzE4NCIsImlhdCI6MTcyOTAwODg4MX0.iyZmFgg2S9QSBPrhyk9SKZmGlohwXL2wJN7Po0hcN18",
      },
      env_production: {
        NODE_ENV: "production",
        VITE_AUTH_API_URL: "http://3.223.79.130:5002/api",
        VITE_ACADEMIC_API_URL: "http://3.223.79.130:5001/api",
        VITE_AI_API_URL: "http://3.223.79.130:5003/api",
        VITE_ENVIRONMENT: "production",
        VITE_IAWALKER_API_ENDPOINT:
          "https://api.ia-walker.com.br/rest/v1/agents/670e8755ce7ecf43a5881034/chats",
        VITE_IAWALKER_API_KEY:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU5NGYxNTViZjBlYjZkNTQ5MzE4NCIsImlhdCI6MTcyOTAwODg4MX0.iyZmFgg2S9QSBPrhyk9SKZmGlohwXL2wJN7Po0hcN18",
      },
    },
  ],
};
