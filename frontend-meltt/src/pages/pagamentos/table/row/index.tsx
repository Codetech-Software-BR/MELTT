import { Avatar, Stack, TableCell, TableRow } from "@mui/material";

interface RowData {
  nome: string;
  email: string;
  formatura_paga: string;
}

interface TableRowPagamentosProps {
  row: RowData;
  onClickRow: (row: RowData) => void;
}

const TableRowPagamentos: React.FC<TableRowPagamentosProps> = ({ row, onClickRow }) => {
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
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">
        {row.formatura_paga}
      </TableCell>
    </TableRow>
  );
};

export default TableRowPagamentos;
