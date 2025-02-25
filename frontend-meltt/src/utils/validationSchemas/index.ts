import * as Yup from "yup";

export const validateStudentSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  documento: Yup.string().required("o campo documento é obrigatório."),
  turma_id: Yup.string().required("o campo turma é obrigatório."),
  telefone: Yup.string().required("o campo telefone é obrigatório."),
});

export const validateFaculdadeSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  endereco: Yup.string().required("o campo email é obrigatório."),
  telefone: Yup.string().required("o campo telefone é obrigatório."),
});

export const validateTurmaSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  identificador: Yup.string().required("o campo identificador é obrigatório."),
  ano_formatura: Yup.string().required("o campo ano de formatura é obrigatório."),
  regras_adesao: Yup.string().required("o campo regras de adesão é obrigatório."),
  regras_rescisao: Yup.string().required("o campo regras de rescisão é obrigatório."),
  regras_renegociacao: Yup.string().required("o campo regras de renegociação é obrigatório."),
});

export const validateTarefaSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  responsaveis: Yup.array().required("o campo responsáveis é obrigatório."),
  atribuido_por: Yup.string().required("o campo atribuído por é obrigatório."),
})

export const validateTeacherSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  telefone: Yup.string().required("campo obrigatório."),
  email: Yup.string().required("campo obrigatório."),
});

export const validateActivitiesSchema = Yup.object({
  quantidade_questoes: Yup.string()
    .required("o campo número de questões é obrigatório.")
    .max(2, "o campo número de questões deve ter no máximo 2 caracteres."),
  quantidade_acertos: Yup.string()
    .required("o campo número de acertos é obrigatório.")
    .max(2, "o campo número de acertos deve ter no máximo 2 caracteres."),
  atividade_adequada: Yup.boolean().required(
    "o campo atividade adequada é obrigatório."
  ),
});

export const validateFornecedorSchema = Yup.object({
  nome: Yup.string().required("o campo nome da empresa é obrigatório."),
  tipo_servico: Yup.string().required("o campo tipo de serviço é obrigatório."),
  telefone: Yup.string().required("o campo telefone é obrigatório."),
  valor_cotado: Yup.string().required("o campo atividade adequada é obrigatório."),
  status: Yup.string().required("o campo status é obrigatório."),
});

export const validateEventoSchema = Yup.object({
  nome_evento: Yup.string().required("o campo nome é obrigatório."),
  descricao_evento: Yup.string().required("o campo endereço é obrigatório."),
  valor_ingresso: Yup.number().required("o campo valor é obrigatório."),
});

export const validateSchoolSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  cidade: Yup.string().required("o campo cidade é obrigatório."),
  uf: Yup.string().required("o campo uf é obrigatório."),
  cnpj: Yup.string().required("o campo cnpj é obrigatório."),
  telefone: Yup.string().required("o campo telefone é obrigatório."),
  responsavel: Yup.string().required("o campo responsável é obrigatório."),
  email: Yup.string().required("o campo email é obrigatório."),
  cep: Yup.string().required("o campo cep é obrigatório."),
  endereco: Yup.string().required("o campo endereço é obrigatório."),
  numero: Yup.string().required("o campo número é obrigatório."),
  complemento: Yup.string().required("o campo complemento é obrigatório."),
  bairro: Yup.string().required("o campo bairro é obrigatório."),
  educacao_basica: Yup.array().required(
    "o campo etapa educação é obrigatório."
  ),
  turno: Yup.array().required("o campo turno é obrigatório."),
  materias: Yup.array().required("o campo matérias é obrigatório."),
});

export const validateConfigUserSchema = Yup.object({
  nome: Yup.string().required("o campo nome é obrigatório."),
  email: Yup.string().required("o campo email é obrigatório."),
  role: Yup.string().required("o campo cargo/permissão é obrigatório."),
  senha: Yup.string().max(8).required("o campo senha é obrigatório."),
});

export const validateExecConfigTieBreakerSchema = Yup.object({
  deficit_geral: Yup.string().required("o campo é obrigatório."),
});
