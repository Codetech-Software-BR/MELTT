import axios from "axios";

class BlingController {
    async getAllContasReceber(req, res) {
        try {
            const { authorization } = req.headers;
            const { pagina = 1, situacoes, dataInicial, dataFinal } = req.query;
            const token = authorization.replace(/^Bearer\s+/i, "");

            const params = new URLSearchParams();
            params.append("limite", 20)
            params.append("pagina", pagina);
            if (situacoes) params.append("situacoes", situacoes);
            if (dataInicial) params.append("dataInicial", dataInicial);
            if (dataFinal) params.append("dataFinal", dataFinal);

            const response = await axios.get(
                `https://www.bling.com.br/Api/v3/contas/receber?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.json(response.data);
        } catch (error) {
            console.error("Erro ao comunicar com Bling:", error.response?.data || error.message);
            return res.status(500).json({
                error: "Erro ao comunicar com Bling",
                detalhes: error.response?.data || error.message,
            });
        }
    }
}

export default new BlingController();
