import { LuPartyPopper } from "react-icons/lu";
import { FaChartSimple, FaFileSignature, FaGraduationCap, FaMoneyBill1Wave, FaUsers } from "react-icons/fa6";
import { FaCircle, FaHardHat } from "react-icons/fa";
import { MateriaType } from "../../types";
import { BiSolidParty, BiSupport } from "react-icons/bi";

export const menuListAdmin = [
  {
    title: "Dashboards",
    route: "/dashboard",
    subRoutes: [
      { title: "Fornecedores", route: "/dashboard/fornecedor", icon: <FaCircle size={8} className="text-white" /> },
      { title: "Alunos", route: "/dashboard/alunos", icon: <FaCircle size={8} className="text-white" /> },
      { title: "Turmas", route: "/dashboard/turma", icon: <FaCircle size={8} className="text-white" /> },
    ],
    icon: <FaChartSimple size={22} />,
  },
  {
    title: "Turmas",
    route: "/turmas",
    icon: <FaGraduationCap size={22}  />,
  },
  // {
  //   title: "Alunos",
  //   route: "/alunos",
  //   icon: <FaUsers size={22}  />,
  // },
  {
    title: "Fornecedores",
    route: "/fornecedores",
    icon: <FaHardHat size={22} />,
  },
  {
    title: "Pagamentos",
    route: "/pagamentos",
    icon: <FaMoneyBill1Wave size={22} />,
  },
  {
    title: "Eventos",
    route: "/eventos",
    icon: <BiSolidParty size={22} />,
  },
  {
    title: "Contratos",
    route: "/contratos-envio",
    icon: <FaFileSignature size={22} />,
  },
];

export const menuListAssociacao = [
  {
    title: "Contratos",
    route: "/contratos",
    icon: <FaGraduationCap size={22} />,
  },
  {
    title: "Suporte",
    route: "/suporte",
    icon: <BiSupport size={22} />,
  },
];


export const menuListAluno = [
  {
    title: "Turma",
    route: "/turmas",
    icon: <FaGraduationCap size={22}/>,
  },
  {
    title: "Pagamentos",
    route: "/pagamentos",
    icon: <FaMoneyBill1Wave size={22} />,
  },
  {
    title: "Eventos",
    route: "/eventos",
    icon: <LuPartyPopper size={22}/>,
  },
  {
    title: "Suporte",
    route: "/suporte",
    icon: <BiSupport size={22} />,
  },
];


export const listStudentsDrawerNavigation = [
  { key: "cadastro", label: "Cadastro" },
  { key: "preferencias", label: "Preferências e Interesses" },
  { key: "sensorial", label: "Teste de predominância Sensorial" },
  { key: "executiva", label: "Função Executiva" },
  { key: "atividades", label: "Atividades" },
];

export const listDeficitsGeral = [
  {
    key: "deficit_controle_inibitorio",
    value: "deficit_controle_inibitorio",
    label: "Controle Inibitório",
  },
  {
    key: "deficit_memoria_trabalho",
    value: "deficit_memoria_trabalho",
    label: "Memória de Trabalho",
  },
  {
    key: "deficit_flex_cognitiva",
    value: "deficit_flex_cognitiva",
    label: "Flexibilidade Cognitiva",
  },
];

export const listTipoAprendizado = [
  { key: "visao", value: "visao", label: "através da Visão" },
  { key: "fazendo", value: "fazendo", label: "através da Prática" },
  {
    key: "instrucoes_verbais",
    value: "instrucoes_verbais",
    label: "através de Instruções Verbais",
  },
];

export const UFList = [
  { key: 'AC', value: 'AC', label: 'Acre' },
  { key: 'AL', value: 'AL', label: 'Alagoas' },
  { key: 'AP', value: 'AP', label: 'Amapá' },
  { key: 'AM', value: 'AM', label: 'Amazonas' },
  { key: 'BA', value: 'BA', label: 'Bahia' },
  { key: 'CE', value: 'CE', label: 'Ceará' },
  { key: 'DF', value: 'DF', label: 'Distrito Federal' },
  { key: 'ES', value: 'ES', label: 'Espírito Santo' },
  { key: 'GO', value: 'GO', label: 'Goiás' },
  { key: 'MA', value: 'MA', label: 'Maranhão' },
  { key: 'MT', value: 'MT', label: 'Mato Grosso' },
  { key: 'MS', value: 'MS', label: 'Mato Grosso do Sul' },
  { key: 'MG', value: 'MG', label: 'Minas Gerais' },
  { key: 'PA', value: 'PA', label: 'Pará' },
  { key: 'PB', value: 'PB', label: 'Paraíba' },
  { key: 'PR', value: 'PR', label: 'Paraná' },
  { key: 'PE', value: 'PE', label: 'Pernambuco' },
  { key: 'PI', value: 'PI', label: 'Piauí' },
  { key: 'RJ', value: 'RJ', label: 'Rio de Janeiro' },
  { key: 'RN', value: 'RN', label: 'Rio Grande do Norte' },
  { key: 'RS', value: 'RS', label: 'Rio Grande do Sul' },
  { key: 'RO', value: 'RO', label: 'Rondônia' },
  { key: 'RR', value: 'RR', label: 'Roraima' },
  { key: 'SC', value: 'SC', label: 'Santa Catarina' },
  { key: 'SP', value: 'SP', label: 'São Paulo' },
  { key: 'SE', value: 'SE', label: 'Sergipe' },
  { key: 'TO', value: 'TO', label: 'Tocantins' }
]

export const schoolMateriasList: MateriaType[] = [
  {title: 'Português', value: 'portugues'},
  {title: 'Matemática', value: 'matematica'},
  {title: 'Física', value: 'fisica'},
  {title: 'Química', value: 'quimica'},
  {title: 'Biologia', value: 'biologia'},
  {title: 'História', value: 'historia'},
  {title: 'Geografia', value: 'geografia'},
  {title: 'Inglês', value: 'ingles'},
  {title: 'Espanhol', value: 'espanhol'},
  {title: 'Artes', value: 'artes'},
  {title: 'Educação Física', value: 'educacao_fisica'},
  {title: 'Filosofia', value: 'filosofia'},
  {title: 'Sociologia', value: 'sociologia'},
  {title: 'Ensino Religioso', value: 'ensino_religioso'},
  {title: 'Informática', value: 'informatica'},
  {title: 'Empreendedorismo', value: 'empreendedorismo'},
  {title: 'Música', value: 'musica'},
  {title: 'Teatro', value: 'teatro'},
  {title: 'Dança', value: 'danca'},
  {title: 'Canto', value: 'canto'},
  {title: 'Violão', value: 'violao'},
  {title: 'Piano', value: 'piano'},
  {title: 'Violino', value: 'violino'},
]

export const selectOptionsEducacaoBasic = [
  { label: "Educação Infantil", value: "EDUCACAO_INFANTIL" },
  {
    label: "Ensino Fundamental - Anos Iniciais",
    value: "ENSINO_FUNDAMENTAL_ANOS_INICIAIS",
  },
  {
    label: "Ensino Fundamental - Anos Finais",
    value: "ENSINO_FUNDAMENTAL_ANOS_FINAIS",
  },
  { label: "Ensino Médio", value: "ENSINO_MEDIO" },
]

export const selectOptionsTurno = [
  {
    label: "Manhã",
    value: "MANHA",
  },
  {
    label: "Tarde",
    value: "TARDE",
  },
]


export const profileAvatarImages = [
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-14.jpg",
  },
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-32.jpg"
  },
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-25.jpg"
  },
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-9.jpg"
  },
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-33.jpg"
  },
  {
    url: "https://img.freepik.com/vetores-premium/icones-de-avatar-de-pessoas-personagens-de-ilustracao-vetorial-para-midias-sociais-e-redes-perfil-de-usuario_770455-17.jpg"
  },
  {
    url: "https://media.licdn.com/dms/image/v2/C4D0BAQGHK2vhhHiVfQ/company-logo_200_200/company-logo_200_200/0/1678893040439/meltt_formaturas_logo?e=2147483647&v=beta&t=HbKS2BEqaCTDQL4JYmNDwzxD0OH-tS1wNYau8TDjrjw"
  }
]