// import express from "express";
// import axios from 'axios';
// import FormData from 'form-data'
// import authMiddleware from "../middlewares/auth/index.js";
// import multer from "multer";

// const router = express.Router();
// const uploadMiddleware = multer({ storage: multer.memoryStorage() });

// router.post("/estatuto", authMiddleware, uploadMiddleware.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Nenhum arquivo enviado" });
//     }

//     const formData = new FormData();
//     formData.append('file', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype
//     });

//     const response = await axios.post(
//       'https://secure.d4sign.com.br/api/v1/documents/upload',
//       formData,
//       {
//         params: {
//           token_api: process.env.D4SIGN_TOKEN_API,
//           crypt_key: process.env.D4SIGN_CRYPTKEY,
//           uuid_safe: process.env.D4SIGN_ESTATUTOS_SAFER
//         },
//         headers: {
//           ...formData.getHeaders(),
//           "Content-Length": formData.getLengthSync()
//         }
//       }
//     );

//     res.json({ uuid: response.data.uuid }); // Retorna apenas o UUID
//   } catch (error) {
//     console.error("Erro no upload:", error.response?.data || error.message);
//     res.status(500).json({ error: "Falha no upload de Estatuto" });
//   }
// });

// router.post("/contrato-meltt", authMiddleware, async (req, res) => {
//   try {
//     const file = req.files.file;

//     const formData = new FormData();
//     formData.append('file', file.data, { filename: file.name });

//     const response = await axios.post(
//       'https://secure.d4sign.com.br/api/v1/documents/upload',
//       formData,
//       {
//         params: {
//           tokenAPI: process.env.D4SIGN_TOKEN_API,
//           cryptKey: process.env.D4SIGN_CRYPTKEY,
//           uuidSafe: process.env.D4SIGN_CONTRATO_MELTT_SAFER
//         },
//         headers: {
//           ...formData.getHeaders()
//         }
//       }
//     );

//     res.json({ uuid: response });
//   } catch (error) {
//     res.status(500).json({ error: "Falha no upload" });
//   }
// });


// export default router;