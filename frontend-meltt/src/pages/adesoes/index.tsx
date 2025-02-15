import React, { useState } from 'react';
import { Paper, Typography, Chip, Grid, Button, Modal, Box, TextField, Dialog, DialogTitle, DialogActions } from '@mui/material';

interface Adesao {
    id: number;
    nomeAluno: string;
    dataAdesao: string | null;
    turma: string;
    valor: string;
    status: string;
    descricao: string;
}

const initialAdesoes: Adesao[] = [
    {
        id: 1,
        nomeAluno: 'João Silva',
        dataAdesao: '2024-02-12',
        turma: '3º Ano A',
        valor: 'R$ 150,00',
        status: 'Aderida',
        descricao: 'Adesão realizada com sucesso.'
    },
    {
        id: 2,
        nomeAluno: 'Maria Oliveira',
        dataAdesao: null,
        turma: '2º Ano B',
        valor: 'R$ 120,00',
        status: 'Pendente',
        descricao: ''
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Aderida':
            return 'success';
        case 'Pendente':
            return 'warning';
        case 'Não Aderida':
            return 'error';
        default:
            return 'default';
    }
};

const AdesoesPage: React.FC = () => {
    const [adesoes, setAdesoes] = useState<Adesao[]>(initialAdesoes);
    const [open, setOpen] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [editingAdesao, setEditingAdesao] = useState<Adesao | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleOpen = (adesao: Adesao | null = null) => {
        setEditingAdesao(adesao);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingAdesao(null);
    };

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newAdesao: Adesao = {
            id: editingAdesao ? editingAdesao.id : adesoes.length + 1,
            nomeAluno: formData.get('nomeAluno') as string,
            dataAdesao: formData.get('dataAdesao') as string || null,
            turma: formData.get('turma') as string,
            valor: formData.get('valor') as string,
            status: formData.get('status') as string,
            descricao: formData.get('descricao') as string || ''
        };

        if (editingAdesao) {
            setAdesoes(adesoes.map((a) => (a.id === editingAdesao.id ? newAdesao : a)));
        } else {
            setAdesoes([...adesoes, newAdesao]);
        }
        handleClose();
    };

    const handleDeleteConfirmation = (id: number) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const handleDelete = () => {
        setAdesoes(adesoes.filter((adesao) => adesao.id !== deleteId));
        setOpenDelete(false);
    };

    return (
        <Grid container spacing={2} sx={{ padding: 3 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => handleOpen()}>Adicionar Adesão</Button>
            </Grid>
            {adesoes.map((adesao) => (
                <Grid item xs={12} sm={6} md={4} key={adesao.id}>
                    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h6">
                            {adesao.nomeAluno}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Turma:</strong> {adesao.turma}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Valor:</strong> {adesao.valor}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Data de Adesão:</strong> {adesao.dataAdesao || 'Ainda não aderida'}
                        </Typography>
                        <Chip label={adesao.status} color={getStatusColor(adesao.status)} sx={{ mt: 1 }} />
                        {adesao.descricao && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>Descrição:</strong> {adesao.descricao}
                            </Typography>
                        )}
                        <Button size="small" onClick={() => handleOpen(adesao)} sx={{ mt: 1 }}>Editar</Button>
                        <Button size="small" color="error" onClick={() => handleDeleteConfirmation(adesao.id)} sx={{ mt: 1, ml: 1 }}>Remover</Button>
                    </Paper>
                </Grid>
            ))}
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
                    <Typography variant="body1" color='primary' fontWeight={600}>{editingAdesao ? 'Editar Adesão' : 'Nova Adesão'}</Typography>
                    <form onSubmit={handleSave}>
                        <TextField fullWidth margin="dense" label="Nome do Aluno" name="nomeAluno" defaultValue={editingAdesao?.nomeAluno || ''} required />
                        <TextField fullWidth margin="dense" label="Turma" name="turma" defaultValue={editingAdesao?.turma || ''} required />
                        <TextField fullWidth margin="dense" label="Valor" name="valor" defaultValue={editingAdesao?.valor || ''} required />
                        <TextField fullWidth margin="dense" label="Data de Adesão" name="dataAdesao" type="date" defaultValue={editingAdesao?.dataAdesao || ''} />
                        <TextField fullWidth margin="dense" label="Status" name="status" defaultValue={editingAdesao?.status || ''} required />
                        <TextField fullWidth margin="dense" label="Descrição" name="descricao" defaultValue={editingAdesao?.descricao || ''} multiline rows={3} />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Salvar</Button>
                        <Button onClick={handleClose} sx={{ mt: 2, ml: 1 }}>Cancelar</Button>
                    </form>
                </Box>
            </Modal>
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} sx={{ padding: 3 }}>
                <DialogTitle sx={{ fontFamily: "Poppins" }}>Tem certeza que deseja remover esta adesão?</DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setOpenDelete(false)} sx={{ fontFamily: 'Poppins' }}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" sx={{ fontFamily: 'Poppins' }}>Remover</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default AdesoesPage;