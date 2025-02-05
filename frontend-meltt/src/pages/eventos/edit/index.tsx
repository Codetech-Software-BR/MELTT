import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { validateEventoSchema } from "../../../utils/validationSchemas";
import toast from "react-hot-toast";
import { useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { apiPostData, apiPutData } from "../../../services/api";
import { LoadingButton } from "@mui/lab";
import { BiSave } from "react-icons/bi";
import { useFaculdadeContext } from "../../../providers/faculdadeContext";
import { initialValuesEvento } from "../../../initialValues";
import { MdOutlineAttachMoney } from "react-icons/md";
import { DropzoneOptions, useDropzone } from "react-dropzone";

const EventosPageEdit = () => {
  const navigate = useNavigate();
  const { stateFaculdade } = useFaculdadeContext();
  const { id } = useParams();

  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);
  const [loadingEvento, setLoadingEvento] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: { "image/*": [] },
    onDrop,
  };
  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const getEventosInitialValue = Object.keys(initialValuesEvento).reduce(
    (acc, key) => {
      (acc as any)[key] = id
        ? stateFaculdade.faculdadeSelecionada?.[
            key as keyof typeof initialValuesEvento
          ]
        : initialValuesEvento[key as keyof typeof initialValuesEvento];
      return acc;
    },
    {} as typeof initialValuesEvento
  );

  const onSubmitEvento = async (values: any) => {
    setLoadingEvento(true);

    if (imageFile) {
      const reader = new FileReader();

      reader.readAsDataURL(imageFile); // Converte a imagem em Base64

      reader.onload = async () => {
        const base64Image = reader.result; // Obtém a string Base64 da imagem

        const formData = new FormData();

        formData.append("foto_evento", base64Image as string); // Adiciona a imagem como Base64

        // Adiciona os outros campos do formulário ao FormData
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            formData.append(key, values[key]);
          }
        }

        try {
          if (id) {
            const response = await apiPutData(
              "academic",
              `/eventos/${id}`,
              formData
            );
            if (response.result?.nome) {
              toast.success("Evento atualizado com sucesso");
              navigate("/eventos");
            }
          } else {
            const response = await apiPostData(
              "academic",
              "/eventos",
              formData
            );
            if (response.id) {
              toast.success("Evento salvo com sucesso");
              navigate("/eventos");
            }
          }
        } catch (error) {
          toast.error("Erro ao salvar evento");
        }
      };

      reader.onerror = () => {
        toast.error("Erro ao processar imagem");
      };
    } else {
      toast.error("Por favor, selecione uma imagem para o evento");
    }

    setLoadingEvento(false);
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
            overflow: "auto",
            borderRadius: "24px",
            backgroundColor: "#fff",
          }}
        >
          <Formik
            initialValues={{
              ...getEventosInitialValue,
            }}
            validationSchema={validateEventoSchema}
            onSubmit={(values: any) => onSubmitEvento(values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form
                className="h-[100%] flex flex-col justify-between"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              >
                <Stack padding={2} gap={2} width={"100%"}>
                  <Stack direction={"column"}>
                    <Typography fontFamily={"Poppins"} fontWeight={600}>
                      Dados do Evento
                    </Typography>
                    <Typography
                      fontFamily={"Poppins"}
                      variant="caption"
                      color="textSecondary"
                    >
                      preencha com as informações necessárias do evento
                    </Typography>
                  </Stack>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <input {...getInputProps()} />
                    {imagePreview ? (
                      <Stack style={{ textAlign: "center" }}>
                        <Stack
                          width={"100%"}
                          height={"100%"}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <img
                            src={imagePreview}
                            alt="Prévia"
                            style={{ maxWidth: "200px", marginBottom: "10px" }}
                          />
                        </Stack>
                        <Button
                          onClick={removeImage}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "red",
                            color: "#fff",
                            border: "none",
                            padding: "5px",
                            fontFamily: "Poppins",
                            fontSize: 12,
                          }}
                        >
                          Remover
                        </Button>
                      </Stack>
                    ) : (
                      <Stack direction={"column"}>
                        <p>Imagem capa do evento</p>
                        <small className="text-xs font-light text-slate-500">
                          Arraste e solte uma imagem aqui, ou clique para
                          selecionar
                        </small>
                      </Stack>
                    )}
                  </div>
                  <Stack width={"50%"} gap={2}>
                    <TextField
                      fullWidth
                      focused
                      label="Nome do evento"
                      name="nome_evento"
                      size="small"
                      placeholder="nome da faculdade"
                      value={values.nome_evento}
                      onChange={handleChange}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    focused
                    label="Descreva seu evento"
                    name="descricao_evento"
                    size="small"
                    placeholder="descreva o evento, local, data, horário, etc."
                    value={values.descricao_evento}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    focused
                    label="Organizador do evento"
                    name="organizador"
                    size="small"
                    placeholder=""
                    value={values.organizador}
                    onChange={handleChange}
                  />
                  <Stack width={"80%"} direction={"row"} gap={2}>
                    <TextField
                      focused
                      color="secondary"
                      label="Valor do ingresso"
                      name="valor_ingresso"
                      size="small"
                      placeholder="R$ 0,00"
                      value={values.valor_ingresso}
                      onChange={handleChange}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdOutlineAttachMoney
                                className="text-[#ffc60b]"
                                size={24}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <TextField
                      focused
                      type="number"
                      label="Quantidade de Ingressos disponíveis"
                      name="quantidade_ingresso"
                      size="small"
                      placeholder="0"
                      value={values.quantidade_ingresso}
                      onChange={handleChange}
                      inputProps={{
                        min: 0,
                      }}
                    />
                  </Stack>
                </Stack>
                <Stack
                  width={"100%"}
                  justifyContent={"flex-end"}
                  direction={"row"}
                  gap={2}
                  px={2}
                  mt={1}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/eventos")}
                    sx={{ width: 120, borderRadius: 2, fontFamily: "Poppins" }}
                  >
                    Voltar
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="small"
                    loading={loadingEvento}
                    endIcon={<BiSave />}
                    sx={{ width: 120, borderRadius: 2, fontFamily: "Poppins" }}
                  >
                    Salvar
                  </LoadingButton>
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

export default EventosPageEdit;
