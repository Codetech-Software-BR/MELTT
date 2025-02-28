import axios from "axios";
import db from "../db.js";
import { format, subMonths, addMonths } from "date-fns";

class BlingController {
  async getAllContasReceber(req, res) {
    try {
      const { authorization } = req.headers;
      const { pagina = 1, situacoes, dataInicial, dataFinal } = req.query;
      const token = authorization.replace(/^Bearer\s+/i, "");

      const params = new URLSearchParams();
      params.append("limite", "20");
      params.append("pagina", String(pagina));
      params.append("tipoFiltroData", "V");

      const dataInicialCalculada = subMonths(new Date(), 2); // 2 meses atrás
      const dataFinalCalculada = addMonths(new Date(), 3); // 2 meses à frente

      const dataInicialFormatada = format(dataInicialCalculada, 'yyyy-MM-dd');
      const dataFinalFormatada = format(dataFinalCalculada, 'yyyy-MM-dd');

      params.append("dataInicial", dataInicialFormatada);
      params.append("dataFinal", dataFinalFormatada);
      if (situacoes) params.append("situacoes[]", situacoes);
      if (dataInicial) params.append("dataInicial", "2025-01-01");
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

      const contasReceber = response.data.data;
      
      let insertedCount = 0;
      let duplicateCount = 0;

      for (const conta of contasReceber) {
        const { 
          id: blingPaymentId,
          valor, 
          vencimento, 
          situacao, 
          dataEmissao, 
          linkBoleto,
        } = conta;
        
        const { id: blingContactId, numeroDocumento } = conta.contato;

        try {
          const [result] = await db.promise().query(`
            INSERT IGNORE INTO pagamentos (
              bling_payment_id,
              id_bling, 
              valor, 
              vencimento, 
              situacao, 
              dataEmissao, 
              linkBoleto,
              numeroDocumento
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            blingPaymentId,
            blingContactId,
            valor,
            vencimento,
            situacao,
            dataEmissao,
            linkBoleto || null,
            numeroDocumento
          ]);

          if (result.affectedRows === 1) {
            insertedCount++;
          } else {
            duplicateCount++;
          }
          
        } catch (queryErr) {
          console.error("Database error:", queryErr);
          continue;
        }
      }

      return res.json({ 
        message: "Dados salvos com sucesso",
        data: contasReceber,
        inserted: insertedCount,
        duplicates: duplicateCount,
        success: true
      });
    } catch (error) {
      console.error("Erro ao comunicar com Bling:", error.response?.data || error.message);
      return res.status(500).json({
        message: error.message,
        status: error.status
      });
    }
  }
}

export default new BlingController();
