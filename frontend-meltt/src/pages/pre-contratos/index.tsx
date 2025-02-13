import { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type Item = {
  id: string;
  content: string;
  createdBy: string;
  studentName: string;
  agreedValue: string;
  packageInterest: string;
  createdAt: string;
};

type Column = {
  name: string;
  items: Item[];
};

type Columns = {
  [key: string]: Column;
};

const initialColumns: Columns = {
  "parado": {
    name: "Parado",
    items: [],
  },
  "em-contato": {
    name: "Em Contato",
    items: [],
  },
  "concluido": {
    name: "Concluído",
    items: [],
  },
};

const PreContratoPage = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [openModal, setOpenModal] = useState(false);
  const [newCard, setNewCard] = useState<Omit<Item, "id" | "createdAt">>({
    content: "",
    createdBy: "",
    studentName: "",
    agreedValue: "",
    packageInterest: "",
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (!startColumn || !finishColumn) return;

    const newStartItems = [...startColumn.items];
    const [movedItem] = newStartItems.splice(source.index, 1);

    const newFinishItems = [...finishColumn.items];
    newFinishItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: { ...startColumn, items: newStartItems },
      [destination.droppableId]: { ...finishColumn, items: newFinishItems },
    });
  };

  const addNewCard = () => {
    if (
      !newCard.content.trim() ||
      !newCard.createdBy ||
      !newCard.studentName ||
      !newCard.agreedValue ||
      !newCard.packageInterest
    )
      return;

    const newCardData: Item = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString("pt-BR"),
      ...newCard,
    };

    setColumns({
      ...columns,
      parado: {
        ...columns.parado,
        items: [...columns.parado.items, newCardData],
      },
    });

    setNewCard({
      content: "",
      createdBy: "",
      studentName: "",
      agreedValue: "",
      packageInterest: "",
    });

    setOpenModal(false);
  };

  const removeCard = (columnId: string, cardId: string) => {
    const filteredItems = columns[columnId].items.filter((item) => item.id !== cardId);
    setColumns({
      ...columns,
      [columnId]: { ...columns[columnId], items: filteredItems },
    });
  };

  // Função para calcular o valor total dos pré-contratos
  const getTotalAgreedValue = () => {
    return Object.values(columns)
      .flatMap((column) => column.items)
      .reduce((total, item) => total + parseFloat(item.agreedValue || "0"), 0)
      .toFixed(2); // Total com 2 casas decimais
  };

  return (
    <Stack width={"calc(100% - 28px)"}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} my={2}>
        <h2 className="text-2xl text-default font-extrabold">Controle de Pré-Contrato com Formandos</h2>
        <Button
          color="secondary"
          variant="contained"
          endIcon={<IoMdAdd />}
          onClick={() => setOpenModal(true)}
          sx={{ borderRadius: 2 }}
        >
          Adicionar Card
        </Button>
      </Stack>

      <DragDropContext onDragEnd={onDragEnd}>
        <Stack direction={"row"} spacing={2}>
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    width: 300,
                    minHeight: 350,
                    background: "#e4e4e4",
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" fontFamily={"Poppins"} color="primary" fontWeight={600}>
                    {column.name}
                  </Typography>
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{ marginBottom: 2, padding: 1 }}
                        >
                          <CardContent>
                            <Stack direction={"column"} gap={2}>
                              <Stack direction={"column"} gap={1}>
                                <Typography variant="caption" color="textSecondary" fontFamily={"Poppins"}>
                                  Criado em: {item.createdAt}
                                </Typography>
                              </Stack>
                              <TextField size="small" label="Criado por" value={item.createdBy} fullWidth disabled />
                              <TextField size="small" label="Aluno" value={item.studentName} fullWidth disabled />
                              <TextField size="small" label="Valor Acordado" value={item.agreedValue} fullWidth disabled />
                              <TextField size="small" label="Pacote de Formatura" value={item.packageInterest} fullWidth disabled />
                              <Button color="error" size="small" variant="contained" onClick={() => removeCard(columnId, item.id)} sx={{ fontFamily: "poppins" }}>
                                Remover
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          ))}
        </Stack>
      </DragDropContext>

      <Stack mt={4}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h6" color="primary" fontWeight={600} fontFamily={'Poppins'}>Lista de Pré-Contratos</Typography>
          <Stack direction={'column'} alignItems={'center'}>
            <Typography variant="body2" color="textSecondary" fontFamily={'Poppins'}>Valor Total de Pré-Contrato</Typography>
            <Typography variant="body2" color="success" fontWeight={600} fontFamily={'Poppins'}>{getTotalAgreedValue()}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} mt={2}>
          {Object.values(columns)
            .flatMap((column) => column.items)
            .map((item) => (
              <Card key={item.id} sx={{ padding: 2 }}>
                <Stack direction="column" gap={1}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant="body2" color="primary" fontFamily={'Poppins'}>Aluno: <strong>{item.studentName}</strong></Typography>
                    <Typography variant="body2" color="primary" fontFamily={'Poppins'}>Criado por:<strong>{item.createdBy}</strong></Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={4}>
                    <Typography variant="body2" color="primary" fontFamily={'Poppins'}>Valor Acordado: <strong>R${item.agreedValue}</strong></Typography>
                    <Typography variant="body2" color="primary" fontFamily={'Poppins'}>Pacote de Formatura: <strong>{item.packageInterest}</strong></Typography>
                  </Stack>
                  <Typography variant="caption" color="textSecondary" fontFamily={'Poppins'}>Criado em: {item.createdAt}</Typography>
                </Stack>
              </Card>
            ))}
        </Stack>
      </Stack>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Adicionar Novo Card</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Nome do aluno"
            value={newCard.studentName}
            onChange={(e) => setNewCard({ ...newCard, studentName: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Criado por"
            value={newCard.createdBy}
            onChange={(e) => setNewCard({ ...newCard, createdBy: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Valor Acordado"
            value={newCard.agreedValue}
            onChange={(e) => setNewCard({ ...newCard, agreedValue: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Pacote de Formatura"
            value={newCard.packageInterest}
            onChange={(e) => setNewCard({ ...newCard, packageInterest: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Descrição"
            multiline
            rows={3}
            value={newCard.content}
            onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={addNewCard}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default PreContratoPage;
