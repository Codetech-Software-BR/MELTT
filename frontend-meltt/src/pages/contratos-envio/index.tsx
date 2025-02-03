import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import BasicTable from "../../components/table";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetData } from "../../services/api";
import { contratosColumns } from "./columns";
import LoadingTable from "../../components/loadingTable";
import NoTableData from "../../components/noData";
import { getToken } from "../../utils/token";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../components/customDrawer";
import { format } from "date-fns";
import CustomModal from "../../components/modal";
import { useDropzone } from "react-dropzone";
import IconUpload from "../../assets/icons/upload";
import { TbTrash } from "react-icons/tb";
import { SlMagnifier } from "react-icons/sl";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { FaFileSignature } from "react-icons/fa6";

const ContratosEnvioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const decoded = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const [onLoad, setOnLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingSendFile, setLoadingSendFile] = useState(false);

  const [listContratos, setListContratos] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(acceptedFiles[0]);
      const reader = new FileReader();

      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
      } else if (file.type === "text/plain") {
        reader.readAsText(file);
      } else if (file.type === "application/pdf") {
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
  });

  const fetchConteudos = () => {
    setLoading(true);
    if (decoded?.tipo === "PROFESSOR") {
      apiGetData("academic", `/s3/get-conteudos/${decoded.id}`).then((res) =>
        setListContratos(res.files)
      );
    } else {
      apiGetData("academic", "s3/get-conteudos").then((res) =>
        setListContratos(res.files)
      );
    }
    setLoading(false);
  };

  const dataRow = (row: any) => {
    return (
      <TableRow
        key={row.url}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row" sx={{ fontFamily: "Poppins" }}>
          {format(row.LastModified, "dd/MM/yyyy")}
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontFamily: "Poppins" }}>
          {row.Name}
        </TableCell>
      </TableRow>
    );
  };

  const onSubmitFile = async () => {
    setLoadingSendFile(true);

    if (!file) {
      toast.error("Selecione um arquivo para enviar");
      setLoadingSendFile(false);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    if (id) {
      formData.append("id_turma", id.toString());
    }
    if (decoded && decoded.id) {
      formData.append("id_aluno", decoded.id.toString());
    }

    const responseSendFile = await fetch(
      `${import.meta.env.VITE_ACADEMIC_API_URL}/turmas/arquivos/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const responseData = await responseSendFile.json();
    if (!responseData.arquivoId) {
      toast.error("Erro ao enviar arquivo");
      setLoadingSendFile(false);
      return;
    }
    if (responseData.arquivoId) {
      toast.success("Contrato Enviado com Sucesso");
      // fetchArquivos();
      setLoadingSendFile(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    setOnLoad(true);
    fetchConteudos();
  }, []);

  return (
    <Stack width={"calc(100% - 28px)"}>
      <Stack direction={"row"} justifyContent={"space-between"} my={2}>
        <h2 className="text-2xl text-default font-extrabold"></h2>
        <LoadingButton
          color="secondary"
          variant="contained"
          endIcon={<FaFileSignature />}
          onClick={() => setOpenModal(true)}
          sx={{ fontFamily: "Poppins" }}
        >
          Enviar Contrato para Assinatura
        </LoadingButton>
      </Stack>
      <Slide direction="right" in={onLoad} mountOnEnter>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            flexGrow: 1,
            width: "100%",
            height: "calc(100vh - 130px)",
            borderRadius: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "12px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ddd",
                borderRadius: "12px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#EFEFEF",
              },
            }}
          >
            {loading ? (
              <LoadingTable />
            ) : listContratos?.length > 0 ? (
              <BasicTable
                columns={contratosColumns}
                rows={listContratos}
                loading={false}
                dataRow={dataRow}
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="Contrato"
                disabledButton={true}
                onClickAction={() => navigate("/atividades/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
      <CustomModal
        title="Enviar Arquivo"
        subHeader="suba um arquivo para compartilhar com os alunos"
        openModal={openModal}
        loadingSave={loadingSendFile}
        onSubmit={onSubmitFile}
        handleCloseModal={() => setOpenModal(false)}
      >
        <Stack direction={"column"} gap={1}>
          <div
            className="h-44 border-2 border-dashed border-default rounded-md"
            {...getRootProps()}
          >
            {file ? (
              <Stack
                height={"100%"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                overflow={"hidden"}
                px={1}
              >
                <IconUpload />
                <Typography
                  variant="body1"
                  fontWeight={800}
                  textAlign={"center"}
                  color="primary"
                >
                  {file?.name}
                </Typography>
                <Typography variant="body2" color="primary">
                  {file?.type}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  <TbTrash size={14} className="text-red-500" />
                </IconButton>
              </Stack>
            ) : (
              <>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className=" flex items-center justify-center text-default h-full text-center">
                    Solte seu arquivo aqui...
                  </p>
                ) : (
                  <Stack
                    width={"100%"}
                    height={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Stack direction={"column"} alignItems={"center"} gap={1}>
                      <IconUpload />
                      <small
                        className="text-[#777] font-light text-xs"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Arraste seu arquivo para iniciar o upload
                      </small>
                      <small
                        className="text-[#777] font-light text-xs"
                        style={{ fontFamily: "Poppins", fontSize: 10 }}
                      >
                        pdf/jpg/png
                      </small>
                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ color: "black", fontSize: 12 }}
                      >
                        ou
                      </Divider>
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<SlMagnifier size={14} color="#2d1c63" />}
                        style={{
                          borderRadius: "8px",
                          padding: "6px",
                          fontSize: 12,
                          width: 150,
                        }}
                      >
                        Buscar arquivo
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </>
            )}
          </div>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Associação que assinará o arquivo:</InputLabel>
            <Select
              fullWidth
              name="associacao"
              // disabled={loadingFaculdades}
              size="small"
              // value={values.faculdade}
              // onChange={handleChange}
            >
              {/* {faculdades.map((faculdade: any) => ( */}
              <MenuItem value={"faculdade.id"}>1</MenuItem>
              {/* ))} */}
            </Select>
          </FormControl>
        </Stack>
      </CustomModal>
    </Stack>
  );
};

export default ContratosEnvioPage;
