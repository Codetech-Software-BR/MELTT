// import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import AWS from 'aws-sdk'
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

class S3Service {
  constructor() {
    if (!S3Service.instance) {
      this.s3Client = new AWS.S3({
        region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
        signatureVersion: "v4",
        // credentials: {
        //   accessKeyId: process.env.AWS_ACCESSKEY,
        //   secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
        // },
      });
      S3Service.instance = this;
    }
    return S3Service.instance;
  }

  async uploadFile(bucketName, filePath, file) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: bucketName,
      Key: filePath,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: "public-read",
    };
    const command = new PutObjectCommand(uploadParams);
    try {
      await this.s3Client.send(command);
      return `https://${bucketName}.s3.amazonaws.com/${filePath}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async listFiles(bucketName, prefix) {
    const listParams = { Bucket: bucketName, Prefix: prefix || "" };
    try {
      const command = new ListObjectsV2Command(listParams);
      const data = await this.s3Client.send(command);
      return data.Contents?.map((item) => ({
        Key: item.Key,
        Url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
        Name: item.Key.split("/").pop(),
        LastModified: item.LastModified,
      })) || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const s3Service = new S3Service();

class s3Controller {
  // async uploadAssociationContract(req, res) {
  //   const { association_id } = req.params;
  //   const file = req.file;
  //   const filePath = `associacao/${association_id}`;

  //   try {
  //     const data = await s3Service.uploadFile(process.env.AWS_BUCKET_CONTRATOS, filePath, file);
  //     fs.unlink(file.path, (err) => err && console.error("Erro ao remover arquivo temp:", err));
  //     res.status(200).json({ message: "Atividade enviada com sucesso", data });
  //   } catch (err) {
  //     res.status(500).json({ error: `Erro ao fazer upload da atividade: ${err.message}` });
  //   }
  // }

  // async uploadTurmaContract(req, res) {
  //   const { turma_id } = req.params;
  //   const file = req.file;

  //   if (!file) {
  //     return res.status(400).json({ error: "Nenhum arquivo enviado." });
  //   }

  //   const filePath = `turmas/${turma_id}/${Date.now()}-${file.originalname}`;

  //   try {
  //     const fileUrl = await this.s3Service.uploadFile(
  //       process.env.AWS_BUCKET_TURMAS,
  //       filePath,
  //       file
  //     );

  //     await TurmaModel.update(
  //       { arquivo_url: fileUrl },
  //       { where: { id: turma_id } }
  //     );
  //     fs.unlink(file.path, (err) => err && console.error("Erro ao remover arquivo temp:", err));

  //     return res.status(200).json({ message: "Arquivo enviado com sucesso", url: fileUrl });
  //   } catch (err) {
  //     return res.status(500).json({ error: `Erro ao enviar arquivo: ${err.message}` });
  //   }
  // }

  async getAllContratosTurma(req, res) {
    try {
      const files = await s3Service.listFiles(process.env.AWS_BUCKET_TURMAS, req.params.prefix);
      res.status(200).json({ message: "Lista de contratos recuperados com sucesso", files });
    } catch (error) {
      res.status(500).json({ error: `Erro ao listar arquivos: ${error.message}` });
    }
  }

  async getConteudosByTurma(req, res) {
    try {
      const files = await s3Service.listFiles(process.env.AWS_BUCKET_TURMAS, `turmas/${req.params.turma_id}`);
      res.status(200).json({ message: "Lista de arquivos recuperados com sucesso", files });
    } catch (error) {
      res.status(500).json({ error: `Erro ao listar os arquivos: ${error.message}` });
    }
  }

  // async getUploadTurmaContractUrl(req, res) {
  //   const {fileName, fileType} = req.query;
    
  //   const filePath = `turmas/${fileName}`;
  //   const command = new PutObjectCommand({
  //     Bucket: process.env.AWS_BUCKET_TURMAS,
  //     Key: filePath,
  //     ContentType: fileType,
  //   });

  //   return await getSignedUrl(s3Service, command, { expiresIn: 3600 });
  // }

  async getUploadTurmaContractUrl(req, res) {
    try {
      const { fileName, fileType, turmaId } = req.query;
  
      if (!fileName || !fileType || !turmaId) {
        return res.status(400).json({ error: "fileName, fileType e turmaId são obrigatórios" });
      }
  
      const filePath = `turmas/${turmaId}`;
  
      const signedUrl = await s3Service.s3Client.getSignedUrl("putObject", {
        Bucket: process.env.AWS_BUCKET_TURMAS,
        Key: filePath,
        ContentType: fileType,
        Expires: 3600,
      });
  
      return res.json({ url: signedUrl });
    } catch (error) {
      console.error("Erro ao gerar presigned URL:", error);
      return res.status(500).json({ error: "Erro ao gerar URL de upload" });
    }
  }

  // async getUploadAssociationContractUrl(filePath, contentType) {
  //   const command = new PutObjectCommand({
  //     Bucket: process.env.AWS_BUCKET_CONTRATOS,
  //     Key: filePath,
  //     ContentType: contentType,
  //   });

  //   return await getSignedUrl(s3Service, command, { expiresIn: 3600 });
  // }
}

export default new s3Controller();

