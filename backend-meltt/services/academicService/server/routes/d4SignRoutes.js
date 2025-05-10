import express from "express";
import axios from 'axios';
import authMiddleware from "../middlewares/auth/index.js";

const router = express.Router();

router.post("/estatuto", authMiddleware, async (req, res) => {
  try {
    const file = req.files.file;

    const formData = new FormData();
    formData.append('file', file.data, { filename: file.name });

    const response = await axios.post(
      'https://secure.d4sign.com.br/api/v1/documents/upload',
      formData,
      {
        params: {
          tokenAPI: process.env.D4SIGN_TOKEN_API,
          cryptKey: process.env.D4SIGN_CRYPTKEY,
          uuidSafe: process.env.D4SIGN_ESTATUTOS_SAFER
        },
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    res.json({ uuid: response.data.uuid });
  } catch (error) {
    res.status(500).json({ error: "Falha no upload" });
  }
});

router.post("/contrato-meltt", authMiddleware, async (req, res) => {
  try {
    const file = req.files.file;

    const formData = new FormData();
    formData.append('file', file.data, { filename: file.name });

    const response = await axios.post(
      'https://secure.d4sign.com.br/api/v1/documents/upload',
      formData,
      {
        params: {
          tokenAPI: process.env.D4SIGN_TOKEN_API,
          cryptKey: process.env.D4SIGN_CRYPTKEY,
          uuidSafe: process.env.D4SIGN_CONTRATO_MELTT_SAFER
        },
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    res.json({ uuid: response.data.uuid });
  } catch (error) {
    res.status(500).json({ error: "Falha no upload" });
  }
});


export default router;