module.exports = {
    apps: [
      {
        name: 'academicService',
        script: './src/server.js',
        instances: '1',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'development',
          PORT:5001,
          DB_HOST:"eduflex-aws.c1qag2yocj6x.us-east-1.rds.amazonaws.com",
          DB_USER:"root",
          DB_PASSWORD:"mypassword",
          DB_NAME:"eduflex",
          JWT_SECRET:"secret1@SbtS1l",
          IA_WALKER_APIKEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU5NGYxNTViZjBlYjZkNTQ5MzE4NCIsImlhdCI6MTcyOTAwODg4MX0.iyZmFgg2S9QSBPrhyk9SKZmGlohwXL2wJN7Po0hcN18",
          AWS_ACCESSKEY:"AKIA2S2Y36UIWCEMZWHX",
          AWS_SECRET_ACCESSKEY:"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",
          AWS_S3_REGION:"us-east-1",
          AWS_BUCKET_ATIVIDADES:"eduflex-atividades",
          AWS_BUCKET_CONTEUDOS:"eduflex-conteudos",
          AWS_BUCKET_IMAGE_ALUNOS:"eduflex-alunos"
        },
        env_production: {
          NODE_ENV: 'production',
          PORT:5001,
          DB_HOST:"eduflex-aws.c1qag2yocj6x.us-east-1.rds.amazonaws.com",
          DB_USER:"root",
          DB_PASSWORD:"mypassword",
          DB_NAME:"eduflex",
          JWT_SECRET:"secret1@SbtS1l",
          IA_WALKER_APIKEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGU5NGYxNTViZjBlYjZkNTQ5MzE4NCIsImlhdCI6MTcyOTAwODg4MX0.iyZmFgg2S9QSBPrhyk9SKZmGlohwXL2wJN7Po0hcN18",
          AWS_ACCESSKEY:"AKIA2S2Y36UIWCEMZWHX",
          AWS_SECRET_ACCESSKEY:"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",
          AWS_S3_REGION:"us-east-1",
          AWS_BUCKET_ATIVIDADES:"eduflex-atividades",
          AWS_BUCKET_CONTEUDOS:"eduflex-conteudos",
          AWS_BUCKET_IMAGE_ALUNOS:"eduflex-alunos"
        }
      }
    ]
  };
  