import React from "react";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { Contrato } from "../../../types";

interface ContratoCardProps {
    contrato: Contrato;
    onEdit: () => void;
    onDelete: (id: string) => void;
    onClick: () => void;
}

const ContratoCard: React.FC<ContratoCardProps> = ({
    contrato,
    onEdit,
    onDelete,
    onClick,
}) => {
    return (
        <Card onClick={onClick} sx={{ cursor: "pointer" }}>
            <CardContent>
                <Typography variant="h6">{contrato.titulo}</Typography>
                <Typography variant="body2">{contrato.descricao}</Typography>
                <Typography variant="caption">{contrato.status}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                    Editar
                </Button>
                <Button
                    size="small"
                    color="error"
                    onClick={(e) => { e.stopPropagation(); onDelete(contrato.id); }}
                >
                    Excluir
                </Button>
            </CardActions>
        </Card>
    );
};

export default ContratoCard;