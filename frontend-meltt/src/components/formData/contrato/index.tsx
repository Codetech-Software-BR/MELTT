import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { Contrato } from "../../../types";

interface ContratoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (contrato: Contrato) => void;
  contrato?: Contrato | null;
}

const ContratoForm: React.FC<ContratoFormProps> = ({
  open,
  onClose,
  onSave,
  contrato,
}) => {
  const formik = useFormik({
    initialValues: {
      titulo: contrato?.titulo || "",
      descricao: contrato?.descricao || "",
      status: contrato?.status || "pendente",
    },
    onSubmit: (values) => {
      const novoContrato: Contrato = {
        id: contrato?.id || String(Math.random()),
        ...values,
        eventos: contrato?.eventos || [],
        fornecedores: contrato?.fornecedores || [],
      };
      onSave(novoContrato);
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: "background.paper", maxWidth: 500, margin: "auto", mt: 5 }}>
        <Typography variant="h6">{contrato ? "Editar Contrato" : "Novo Contrato"}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            name="titulo"
            value={formik.values.titulo}
            onChange={formik.handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={formik.values.descricao}
            onChange={formik.handleChange}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Salvar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ContratoForm;