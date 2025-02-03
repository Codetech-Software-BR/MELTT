module.exports = {
    apps: [
      {
        name: 'authService',
        script: './src/server.js',
        instances: '1',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
          PORT:5002,
          DB_HOST:"eduflex-aws.c1qag2yocj6x.us-east-1.rds.amazonaws.com",
          DB_USER:"root",
          DB_PASSWORD:"mypassword",
          DB_NAME:"eduflex",
          JWT_SECRET:"secret1@SbtS1l",
        },
        env_production: {
          NODE_ENV: 'production',
          PORT:5002,
          DB_HOST:"eduflex-aws.c1qag2yocj6x.us-east-1.rds.amazonaws.com",
          DB_USER:"root",
          DB_PASSWORD:"mypassword",
          DB_NAME:"eduflex",
          JWT_SECRET:"secret1@SbtS1l",
        }
      }
    ]
  };
  