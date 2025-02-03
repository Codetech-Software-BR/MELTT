import { AlunoState } from "../providers/alunoContext";

export const pieChartControleInibitorio = ({ state }: { state: AlunoState }) => [
  {
    name: "Compartilha Brinquedos",
    resultado: state.alunoSelecionado?.compartilha_brinques,
  },
  {
    name: "Consegue Esperar",
    resultado: state.alunoSelecionado?.consegue_esperar,
  },
  {
    name: "Faz o necessário",
    resultado: state.alunoSelecionado?.faz_necessario,
  },
];

export const pieChartMemoriaDeTrabalho = ({ state }: { state: AlunoState }) => [
    {
      name: "Cumpre Ordens",
      resultado: state.alunoSelecionado?.cumpre_ordens,
    },
    {
      name: "Lembra-se de Orientações",
      resultado: state.alunoSelecionado?.lembra_orientacoes,
    },
    {
      name: "Segue passos",
      // resultado: state.alunoSelecionado?.segue_passos,
    },
  ];
  
export const pieChartFlexibilidadeCognitiva = ({ state }: { state: AlunoState }) => [
    {
      name: "Ajusta-se a mudanças",
      resultado: state.alunoSelecionado?.ajuste_mudancas,
    },
    {
      name: "Recupera-se facilmente",
      resultado: state.alunoSelecionado?.recuperacao_rapida,
    },
    {
      name: "Compartilha Brinquedos",
      resultado: state.alunoSelecionado?.compartilha_brinquedos,
    },
  ];
