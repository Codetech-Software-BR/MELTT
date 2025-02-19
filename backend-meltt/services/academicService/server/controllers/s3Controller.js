const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  },
});

const uploadFile = async (bucketName, filePath, file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);
  try {
    await s3Client.send(command);
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${filePath}`;
    return fileUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.uploadAssociationContract = async (req, res) => {
  const { association_id } = req.params;
  const file = req.file;

  const filePath = `associacao/${association_id}`;

  try {
    const data = await uploadFile(process.env.AWS_BUCKET_CONTRATOS, filePath, file);

    // Remove o arquivo temporário
    fs.unlink(file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Erro ao remover o arquivo temporário:', unlinkErr);
      } else {
        console.log('Arquivo temporário removido com sucesso');
      }
    });

    res.status(200).json({ message: 'Atividade enviada com sucesso', data });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer upload da atividade: ' + err.message });
  }
};

exports.uploadTurmaContract = async (req, res) => {
  const { turma_id } = req.params;
  const file = req.file;

  const filePath = `turmas/${turma_id}`;

  try {
    const data = await uploadFile(process.env.AWS_BUCKET_TURMAS, filePath, file);
    // Remove o arquivo temporário
    fs.unlink(file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Erro ao remover o arquivo temporário:', unlinkErr);
      } else {
        console.log('Arquivo temporário removido com sucesso');
      }
    });

    res.status(200).json({ message: 'Conteúdo enviado com sucesso', data });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao enviar conteúdo: ' + err.message });
  }
};

exports.getAllConteudos = async (req, res) => {
  const bucketName = 'eduflex-conteudos'
  const listParams = {
    Bucket: bucketName,
    Prefix: req.params.prefix || "",
  };

  try {
    const command = new ListObjectsV2Command(listParams);
    const data = await s3Client.send(command);

    const files = data.Contents.map((item) => {
      const fileName = item.Key.split('/').pop();

      return {
        Key: item.Key,
        Url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
        Name: fileName,
        LastModified: item.LastModified
      };
    });

    res.status(200).json({ message: "Lista de arquivos recuperados com sucesso", files });
  } catch (error) {
    console.error("Erro ao listar as imagens:", error.message);
    res.status(500).json({ error: "Erro ao listar as imagens: " + error.message });
  }
};

exports.getConteudosByTurma = async (req, res) => {
  const bucketName = process.env.AWS_BUCKET_TURMAS;
  const { turma_id } = req.params;

  const listParams = {
    Bucket: bucketName,
    Prefix: `turmas/${turma_id}`,
  };

  try {
    const command = new ListObjectsV2Command(listParams);
    const data = await s3Client.send(command);

    const files = data.Contents.map((item) => { 
      const fileName = item.Key.split('/').pop();
      ({
        Key: item.Key,
        Url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
        Name: fileName,
        LastModified: item.LastModified
      })
      } 
    );

    res.status(200).json({
      message: "Lista de arquivos recuperados com sucesso",
      files,
    });
  } catch (error) {
    console.error("Erro ao listar os arquivos:", error.message);
    res.status(500).json({ error: "Erro ao listar os arquivos: " + error.message });
  }
};
