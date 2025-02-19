import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { validateTurmaSchema } from "../../../utils/validationSchemas";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { apiGetData, apiPostData, apiPutData } from "../../../services/api";

import { BiSave } from "react-icons/bi";
import { DatePicker, LoadingButton } from "@mui/lab";
import { initialValuesTurma } from "../../../initialValues";
import { useDropzone } from "react-dropzone";
import IconUpload from "../../../assets/icons/upload";
import { TbTrash } from "react-icons/tb";
import { SlMagnifier } from "react-icons/sl";
import { graduationYearsList } from "../../../utils/arrays";
import dayjs from "dayjs";

export type StudentInfo = {
  educacao_basica: string | undefined;
  deficit_geral: string | undefined;
  tipo_aprendizagem: string | undefined;
};

export type StudentInitialValuesFn = (
  id: string | undefined,
  stateAluno: any,
  initialStudentValues: Record<string, any>
) => typeof initialStudentValues;

const TurmasPageNew = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingSave, setLoadingSave] = useState(false);
  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [eventos, setEventos] = useState<{ data: string; descricao: string }[]>([]);
  const [novoEvento, setNovoEvento] = useState({ data: "", descricao: "" });

  const [plans, setPlans] = useState<{ nome: string; inclusos: string; valor: string }[]>([]);
  const [newPlan, setNewPlan] = useState({ nome: "", inclusos: "", valor: "" });

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
    },
  });

  const onSubmitTurma = async (values: any) => {
    setLoadingSave(true);
    console.log('file', file)
    try {
      let fileUrl = null;
      if (file instanceof File) {
        const formData = new FormData();
        formData.append("file", file);
      
        const pressignedUrl = await apiGetData("academic", `/s3/uploads/turma/pressignedUrl?fileName=${file.name}&fileType=${file.type}`);
        
        // console.log('pressignedUrl', pressignedUrl)
        // if (uploadResponse.url) {
        //   fileUrl = uploadResponse.url;
        // }
      } else {
        console.error("Erro: O arquivo não é um objeto File válido.");
      }

      // let dataObj = {
      //   ...values,
      //   faculdade_id: 1,
      //   arquivo_url: fileUrl,
      // };

      // const response = id
      //   ? await apiPutData("academic", `/turmas/${id}`, dataObj)
      //   : await apiPostData("academic", "/turmas", dataObj);

      // if (response.id) {
      //   toast.success("Turma salva com sucesso");
      //   navigate(-1);
      // }
    } catch (error) {
      toast.error("Erro ao salvar turma");
    }
    setLoadingSave(false);
  };


  // const onSubmitTurma = async (values: any) => {
  //   setLoadingSave(true);

  //   console.log('values', values)

  //   let dataObj = {
  //     ...values,
  //     ...eventos,
  //     ...plans,
  //     faculdade_id: 1,
  //   };

  //   try {
  //     if (id) {
  //       const response = await apiPutData("academic", `/turmas/${id}`, dataObj);
  //       if (response.result.nome) {
  //         toast.success("Turma editada com sucesso");
  //         navigate(-1);
  //       }
  //     } else {
  //       const response = await apiPostData("academic", "/turmas", dataObj);
  //       if (response.id) {
  //         toast.success("Turma salvo com sucesso");
  //         navigate(-1);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Erro ao salvar turma");
  //   }
  //   setLoadingSave(false);
  // };

  const adicionarPlano = () => {
    if (!newPlan.nome || !newPlan.inclusos || !newPlan.valor) return;
    setPlans([...plans, newPlan]);
    setNewPlan({ nome: "", inclusos: "", valor: "" });
  };

  const removerPlano = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const adicionarEvento = () => {
    if (!novoEvento.data || !novoEvento.descricao) return;
    setEventos([...eventos, novoEvento]);
    setNovoEvento({ data: "", descricao: "" });
  };

  const removerEvento = (index: number) => {
    setEventos(eventos.filter((_, i) => i !== index));
  };


  return (
    <Stack width={"100%"} height={"100%"} gap={10}>
      <Stack width={"calc(100% - 28px)"} direction={"column"}>
        <Typography
          color="primary"
          variant="h5"
          fontWeight={700}
          ml={4}
          mb={2}
        ></Typography>
        <Paper
          elevation={0}
          style={{
            fontFamily: "Poppins",
            position: "relative",
            padding: "12px",
            height: "calc(100vh - 132px)",
            overflowY: "auto",
            borderRadius: "24px",
            backgroundColor: "#fff",
          }}
        >
          <Formik
            initialValues={{
              ...initialValuesTurma,
            }}
            validationSchema={validateTurmaSchema}
            onSubmit={(values: any) => onSubmitTurma(values)}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form
                className="h-[100%]"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                    () => { };
                  }
                }}
              >
                <Stack height={"100%"} overflow={"auto"}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    p={2}
                    sx={{
                      maxHeight: "calc(85vh - 132px)",
                      overflowY: "auto",
                    }}
                  >
                    <Stack direction={"column"}>
                      <Typography
                        color="primary"
                        fontWeight={600}
                      >
                        Cadastrar Nova Turma (NOVA ASSOCIAÇÃO)
                      </Typography>
                      <Typography
                        variant="caption"
                        color="primary"
                      >
                        preencha as informações abaixo.
                      </Typography>
                    </Stack>
                    {/* <FormControl fullWidth>
                      <InputLabel id="faculdade" sx={{ p: 0.5, bgcolor: "#fff" }}>Faculdade</InputLabel>
                      <Select
                        name="faculdade"
                        color="primary"
                        value={values.faculdade}
                        onChange={handleChange}
                        sx={{ width: "49%" }}
                      >
                        {faculdades.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        name="nome"
                        variant="outlined"
                        focused
                        label="Nome da Turma"
                        value={values.nome}
                        onChange={handleChange}
                        placeholder="Qual o nome da sua turma ?"
                      />
                      <FormControl fullWidth>
                        <InputLabel id="ano_formatura" sx={{ p: 0.5, bgcolor: "#fff" }}>
                          Ano de Formatura
                        </InputLabel>
                        <Select
                          name="ano_formatura"
                          variant="outlined"
                          label="Data de Formatura da Turma"
                          value={values.ano_formatura}
                          error={errors.ano_formatura ? true : false}
                          onChange={handleChange}
                        >
                          {graduationYearsList.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                    <TextField
                      fullWidth
                      name="identificador"
                      variant="outlined"
                      focused
                      label="Identificador da turma"
                      value={values.identificador}
                      onChange={handleChange}
                      placeholder="código único identificador da turma ?"
                    />
                    <Typography variant="body2">Arquivo do Estatuto</Typography>
                    <div
                      className="h-44 border-2 border-dashed border-default rounded-md -mt-4 p-4"
                      {...getRootProps()}
                    >
                      {file ? (
                        <Stack
                          height={"100%"}
                          direction={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          overflow={"hidden"}
                          p={2}
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
                    <Stack spacing={3} bgcolor={"#f9f9f9"} p={2} borderRadius={2}>
                      <Typography variant="body1" color="primary">
                        Planos de Formatura
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          size="small"
                          label="Nome do Plano"
                          value={newPlan.nome}
                          onChange={(e) => setNewPlan({ ...newPlan, nome: e.target.value })}
                          fullWidth
                        />
                        <TextField
                          size="small"
                          label="O que está incluso"
                          value={newPlan.inclusos}
                          onChange={(e) => setNewPlan({ ...newPlan, inclusos: e.target.value })}
                          fullWidth
                        />
                        <TextField
                          size="small"
                          label="Valor"
                          type="number"
                          value={newPlan.valor}
                          onChange={(e) => setNewPlan({ ...newPlan, valor: e.target.value })}
                          fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={adicionarPlano}>
                          <BiSave />
                        </Button>
                      </Stack>
                      <Stack spacing={1}>
                        {plans.map((plano, index) => (
                          <Card key={index} variant="outlined">
                            <CardContent>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>{plano.nome}</Typography>
                              <Typography variant="body2">Inclusos: {plano.inclusos}</Typography>
                              <Typography variant="body2">Valor: R$ {plano.valor}</Typography>
                            </CardContent>
                            <CardActions>
                              <IconButton size="small" color="error" onClick={() => removerPlano(index)}>
                                <TbTrash />
                              </IconButton>
                            </CardActions>
                          </Card>
                        ))}
                      </Stack>
                    </Stack>
                    <TextField
                      fullWidth
                      name="regras_adesao"
                      variant="outlined"
                      focused
                      label="Regras de Adesão"
                      multiline
                      rows={4}
                      value={values.regras_adesao}
                      onChange={handleChange}
                      placeholder="descreva detalhamente as regras de adesão"
                    />
                    <TextField
                      fullWidth
                      name="regras_rescisao"
                      variant="outlined"
                      focused
                      label="Regras de Rescisão"
                      multiline
                      rows={4}
                      value={values.regras_rescisao}
                      onChange={handleChange}
                      placeholder="descreva detalhadamento as regras de rescisão"
                    />
                    <TextField
                      fullWidth
                      name="regras_renegociacao"
                      variant="outlined"
                      focused
                      label="Regras de Renegociação"
                      multiline
                      rows={4}
                      value={values.regras_renegociacao}
                      onChange={handleChange}
                      placeholder="descreva detalhadamente as regras de renegociação"
                    />
                    <Stack gap={2}>
                      <Typography variant="h6">Cronograma Inicial</Typography>
                      <Stack direction="row" gap={2}>
                        <DatePicker
                          label="Data do Evento"
                          value={novoEvento.data ? dayjs(novoEvento.data) : null}
                          onChange={(date: Date | null) => setNovoEvento({ ...novoEvento, data: date ? dayjs(date).format("YYYY-MM-DD") : "" })}
                          renderInput={(params: any) => <TextField {...params} fullWidth />}
                        />
                        <TextField
                          fullWidth
                          label="Descrição"
                          value={novoEvento.descricao}
                          onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                        />
                        <Button variant="contained" onClick={adicionarEvento}>
                          Adicionar
                        </Button>
                      </Stack>

                      {eventos.map((evento, index) => (
                        <Stack key={index} direction="row" alignItems="center" gap={2}>
                          <TextField value={evento.data} fullWidth disabled />
                          <TextField value={evento.descricao} fullWidth disabled />
                          <IconButton onClick={() => removerEvento(index)}>
                            <TbTrash color="red" />
                          </IconButton>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                  <Stack
                    width="100%"
                    justifyContent="flex-end"
                    direction="row"
                    gap={2}
                    px={2}
                    mt={1}
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      p: 2,
                    }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => navigate("/turmas")}
                      sx={{ width: 120, borderRadius: 2 }}
                    >
                      Voltar
                    </Button>
                    <LoadingButton
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      endIcon={<BiSave />}
                      loading={loadingSave}
                      sx={{ width: 120, borderRadius: 2 }}
                    >
                      Salvar
                    </LoadingButton>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
      <LoadingBackdrop
        open={openLoadingBackdrop}
        handleClose={() => setOpenLoadingBackdrop(false)}
      />
    </Stack>
  );
};

export default TurmasPageNew;
