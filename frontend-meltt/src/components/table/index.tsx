import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Stack } from "@mui/material";
import { TableColumnsType } from "../../types";
import { ReactNode } from "react";

type BasicTableProps = {
  columns: TableColumnsType[];
  rows: any[];
  dataRow: (row: any) => ReactNode;
  loading: boolean;
};


export default function BasicTable({
  columns,
  rows,
  dataRow,
  loading,
}: BasicTableProps) {
  return (
    <TableContainer>
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#EFEBFB", padding: 0}}>
          <TableRow>
            {columns.map((column: TableColumnsType) => (
              <TableCell key={column.key} sx={{ fontFamily:"Poppins" }}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Stack width={'100%'} height={'100vh'} alignItems={"center"} justifyContent={"center"}>
              <CircularProgress color="primary" size={36} />
            </Stack>
          ) : (
            rows.map((row) => dataRow(row))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
