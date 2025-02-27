import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import { TableColumnsType } from "../../types";
import { ReactNode } from "react";

type BasicTableProps = {
  page: number;
  totalPages: number;
  columns: TableColumnsType[];
  rows: any[];
  dataRow: (row: any) => ReactNode;
  loading: boolean;
  handleChangePagination: (event: React.ChangeEvent<unknown>, value: number) => void;
};


export default function BasicTable({
  page,
  totalPages,
  columns,
  rows,
  dataRow,
  loading,
  handleChangePagination
}: BasicTableProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <TableContainer sx={{
        maxHeight: "70vh",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#B0BEC5",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#90A4AE",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ECEFF1",
        },
      }}>
        <Table sx={{ width: "100%", height: "30vh" }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "#EFEBFB", padding: 0 }}>
            <TableRow>
              {columns.map((column: TableColumnsType, index) => (
                <TableCell key={column.key} sx={{
                  fontFamily: "Poppins",
                  textAlign: index === columns.length - 1 ? "center" : "left" // Alinha o último ao centro
                }}>{column.label}</TableCell>
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
      <Pagination count={totalPages} page={page} onChange={handleChangePagination} sx={{ mt: 2 }} color="primary" />
    </div>
  );
}
