import axios from "axios";

class BlingController {
    async getAllContasReceber(req, res) {
        try {
            const { authorization } = req.headers;
            const token = authorization.replace(/^Bearer\s+/i, "");

            const response = await axios.get(
                `https://www.bling.com.br/Api/v3/contas/receber?dataInicial=2025-01-01`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.json(response.data);
        } catch (error) {
            console.error(
                "Erro ao comunicar com Bling:",
                error.response?.data || error.message
            );
            return res.status(500).json({ error: "Erro ao comunicar com Bling" });
        }
    }
}

export default new BlingController();