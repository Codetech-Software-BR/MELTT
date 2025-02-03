import { Avatar, Stack, TableCell, TableRow } from "@mui/material";

interface RowData {
  nome: string;
  ano_formatura: string;
  criado_em: string;
}

interface TableRowTurmasProps {
  row: RowData;
  onClickRow: (row: RowData) => void;
}

const TableRowTurmas: React.FC<TableRowTurmasProps> = ({ row, onClickRow }) => {
  return (
    <TableRow
      key={row.nome}
      onClick={() => onClickRow(row)}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
      }}
    >
      <TableCell component="th" scope="row">
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Avatar />
          {row.nome}
        </Stack>
      </TableCell>
      <TableCell align="left">{row.ano_formatura}</TableCell>
      <TableCell align="left">
        {row.criado_em}
      </TableCell>
    </TableRow>
  );
};

export default TableRowTurmas;
