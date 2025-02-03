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

export const tipoAprendizagemPEIText = [
  {
    key: "visao",
    label: "Identificou-se  que o aluno tem preferência por aprender de maneira mais visual. O uso de imagens, desenhos, gráficos, cores que  favorecem o seu aprendizado. Diretrizes para trabalhar com seu aluno na sala de aula.Deixe o local que seu aluno irá realizar as atividades organizado. Isso traz uma limpeza visual e ajuda a manter o foco na atividade.Permita que seu aluno traga respostas para as questões dissertativas em forma de desenho.  Ao usar videoaulas e também nas aulas expositivas, use também imagens ou desenhos, e não somente vídeo ou a sua fala. Utilize histórias em livros interativos ou digitais com ilustrações. Nas disciplinas que exigem uma organização lógica, utilize mapas mentais, gráficos, linha do tempo ou listas. Isso facilita a compreensão e retenção do conteúdo. Crie um material de apoio também nos moldes anteriores, pois isso deixa o conteúdo mais organizado. Essas diretrizes maximizam o engajamento do aluno e a eficácia do aprendizado."
  },
  {
    key: "instrucoes_verbais",
    label: "Identificou-se que o aluno tem preferência por aprender de maneira mais auditiva. Utilize recursos que estimulem a escuta ativa e a compreensão auditiva. Isso pode incluir o uso de gravações, podcasts, palestras, vídeos, discussões em grupo e outras atividades que incentivem o aluno a captar e reter informações através do som. O objetivo é criar um ambiente de aprendizagem que não apenas acomode, mas também potencialize as habilidades auditivas do aluno, promovendo o desenvolvimento acadêmico mais eficaz e satisfatório. Diretrizes para trabalhar com seu aluno na sala de aula. Para cada novo conceito ou habilidade a ser aprendida, ofereça explicações verbais detalhadas , complementadas por exemplos auditivos sempre que possível, isso é especialmente benéfico para tópicos complexos que demandam uma compreensão aprofundada. Divida as orientações em tarefas menores. Nas atividades individuais, deixe seu aluno num ambiente mais calmo e próximo de alunos tranquilos. Nas atividades em grupo, deixe seu aluno com pessoas mais calmas e menos barulhentas. Junto com o seu aluno, encontre um estilo de música que facilite a sua concentração e deixe que ele ouça o som por 5 minutos antes da atividade. Crie aulas com sons e falas, sem muitas figuras que possam distrair a atenção do seu aluno. Utilize a leitura de histórias em livros, história em livro digital gravado e músicas. Ensine seu aluno a estudar lendo em voz alta e gravando para poder ouvir depois quantas vezes achar necessário. Peça para o seu aluno explicar para a turma o que entendeu, isso facilita a sua compreensão. Permita que seu aluno traga respostas orais como forma de avaliação. Essas diretrizes maximizam o engajamento do aluno e a eficácia do aprendizado."
  },
  {
    key: "cinestesico",
    label: "Identificou-se  que o aluno pode se beneficiar significativamente do aprendizado cinestésico seguindo uma abordagem mais tátil e prática. Pense em utilizar atividades que o aluno possa produzir sozinho, em grupo ou com o seu apoio. Preencher algo que está faltando ou preencher o próprio material de apoio são estratégias que ajudam. Diretrizes para trabalhar com seu aluno na sala de aula. Exercite com o seu aluno uma respiração mais profunda, ou até uns minutos de silêncio e olhos fechados antes de iniciar uma atividade. Isso vai favorecer para que ele se sinta tranquilo, tenha boa sensação e facilite o foco na atividade proposta. Você pode fazer isso com a turma toda, com certeza outros alunos vão se beneficiar. O cheiro é algo que auxilia o seu aluno a manter a calma e o foco. Encontre junto com ele um cheiro que lhe agrade e coloque ele em contato com esse perfume em momentos de atividades que requerem maior foco. Repita o cheiro no momento de avaliação. Utilize materiais de diferentes texturas, diferentes cores, diferentes cheiros e contextualize com o aprendizado proposto. Faça uma prática após uma atividade ou conteúdo utilizando a movimentação física, interação com algum material, dinâmicas lúdicas, contação de história ou demonstrações.  Permita que seu aluno traga as respostas de maneiras diferentes como com desenho, figuras ou oralmente. Nas atividades em grupo, coloque seu aluno com aqueles que ele tem mais afinidade. Essas diretrizes maximizam o engajamento do aluno e a eficácia do aprendizado."
  }
]

export const funcaoExecutivaPEIText = [
  {
    key: "deficit_controle_inibitorio",
    label: "Pelo gráfico foi identificado que esse aluno tem mais dificuldade com a função executiva de controle inibitório. Nesse caso, ele pode agir por impulsividade e interromper o professor ou colegas, falando fora de hora e agindo sem pensar nas consequências; pode ter dificuldade em seguir regras principalmente quando precisa esperar para agir; pode se distrair facilmente e não finalizar a tarefa proposta; pode responder de forma exagerada a frustrações; e pode ter dificuldade em controlar alguns comportamentos como levantar frequentemente da cadeira, mexer em objetos que não deveria ou mexer com os colegas. Durante as atividades, essas dificuldades também podem aparecer na forma de impulsividade, começando a escrever sem planejamento, resultando em textos desorganizados e confusos; não realização da revisão da resposta resultando em erros de ortografia, gramática e estrutura; problema com foco e atenção, levando mais tempo para finalizar; interrupções frequentes, o que resulta em parar a tarefa repetidas vezes para mexer no material ou falar com os colegas; e diante das dificuldades ou frustrações, seu aluno pode querer desistir rapidamente e ficar resistente para continuar a atividade. Diretrizes para trabalhar com seu aluno na sala de aula. Faça um exercício de respiração profunda com a turma antes de uma atividade que  requer mais foco, ajudando a  trazer mais consciência do momento e como uma estratégia de autorregulação. Dê instruções claras e curtas, reforçando sempre que for preciso, mostrando para o seu aluno que é importante ele pensar antes de agir ou falar.  Deixe seu aluno do seu lado no momento da explicação da atividade e combine com ele algo que você vai fazer (exemplo dar a mão pra ele) caso ele fale num momento de explicação de atividade.Mostre ao aluno como realizar a atividade dinâmica, passo a passo, para que ele possa imitar o que você faz. Dê orientações passo a passo, dividindo as tarefas em etapas mais curtas e atingíveis, com pequenas pausas entre elas. Ofereça reforço positivo fortalecendo o comportamento adequado a fim de incentivar o foco. Para isso, utilize algum dos itens de preferência do aluno. Forneça um suporte adicional e individual ajudando o aluno a organizar as ideias antes de começar a atividade. Esse suporte também pode ser dado com o uso de material de apoio."
  },
  {
    key: "deficit_memoria_trabalho",
    label: "Pelo gráfico foi identificado que esse aluno tem mais dificuldade com a função executiva de memória de trabalho. Nesse caso, ele pode ter dificuldade de lembrar de informações que acabou de receber tanto instruções verbais quanto referente a uma atividade; pode ter dificuldade em seguir uma tarefa com múltiplos passos; dificuldade em lembrar conteúdos que já foram ensinados, impactando no aprendizado da próxima etapa; ser mais desorganizado tanto com material quanto com as atividades que devem ser realizadas na sala de aula ou em casa, esquecendo de trazê-las; pode levar mais tempo para entender e realizar as atividades por sobrecarregar a memória de trabalho; como não consegue reter as informações durante a realização de uma atividade, tende a ter dificuldade em manter a atenção no que está fazendo; pode perder a linha de pensamento durante a escrita ou leitura, dificultando a interpretação e a escrita; pode ter problema em realizar uma atividade com vários passos; e pode precisar mais de apoio externo para manter um fluxo de tarefa. Diretrizes para trabalhar com seu aluno na sala de aula? Simplifique instruções complexas dividindo-as em passos menores e mais gerenciáveis e com frases curtas e objetivas tanto oralmente quanto por escrito. Isso ajuda o aluno a se concentrar em uma coisa de cada vez, sem se sobrecarregar. Reforce a explicação da sequência do dia e da atividade diretamente com o seu aluno para se certificar que ele sabe o que precisa fazer. Use de recursos visuais como diagramas, fluxogramas e mapas mentais para ajudar os alunos a visualizar e estruturar as informações. Eles podem servir como âncoras de memória. Usar a modelagem facilita o planejamento e organização. Permita que o aluno faça uso de anotações externas e materiais de apoio. E ensine o aluno a fazer pausas regulares revisando a atividade e certificando-se de que está no caminho certo. Faça uso de materiais concretos. Ensine estratégias de memorização como mnemônicos ou acrônimos, que podem ajudar os alunos a lembrar informações importantes."
  },
  {
    key: "deficit_flex_cognitiva",
    label: "Identificou-se que o aluno tem mais dificuldade com a função executiva de flexibilidade cognitiva. Nesse caso, ele pode ter dificuldade em adaptar-se a novas rotinas, mudanças de planos ou transição entre atividades trazendo ansiedade ou frustração; em lidar com situações inesperadas ficando desorganizado; em encontrar uma nova maneira de abordar a tarefa ou o problema demonstrando rigidez de pensamento e dificultando que ele reestruture um texto fazendo mudanças significativas deixando a escrita fragmentada e mal conectada; pode apresentar problemas com multitarefa, o aluno pode ter dificuldade em gerenciar diferentes tarefas ao mesmo tempo, especialmente se elas exigirem a mudança de foco e abordagem resultando em confusão e lentidão; pode ter dificuldade na  resolução de problemas podendo encontrar desafios para pensar de forma criativa ou fora do padrão para resolvê-los; em entender ou considerar o ponto de vista dos outros ou a flexibilidade de regras, o que pode afetar a interação social e a colaboração em grupo; levar o aluno a insistir numa única maneira de organizar ideias e a escrita, prejudicando a clareza e coesão do texto; e em receber instruções no meio da atividade leva ele a perder o foco. Essas dificuldades podem impactar o desempenho acadêmico e o bem-estar emocional do aluno, exigindo estratégias de apoio e ensino adaptativo para ajudar a superar esses obstáculos. Diretrizes para trabalhar com seu aluno na sala de aula. Forneça instruções claras e bem estruturadas para evitar confusão, tendo também um objetivo claro por atividade. Isso pode ajudar o aluno a compreender melhor o que é esperado e como proceder na resolução de problemas. Ofereça a atividade bem estruturada mas com possibilidade de diferentes respostas, o que ajuda o aluno a ter segurança mas ao mesmo tempo não ficar preso num único modelo. Ensine ele a fazer uma lista das ideias antes de iniciar a atividade e destaque que as mudanças são normais e positivas dentro do processo da escrita. Utilize exemplos concretos e materiais variados para demonstrar como um problema pode ser resolvido de diferentes maneiras. Isso pode ajudar o aluno a ver que existem múltiplas abordagens para uma mesma questão. Introduza atividades que requeiram que o aluno substitua um plano ou estratégia por outro, promovendo assim a flexibilidade no pensamento. Dê pequenos feedbacks ao longo da atividade, ajudando o aluno a fazer as mudanças necessárias e evitando uma sobrecarga de correção ao final da atividade. Dê mais tempo ao aluno para se adaptar às mudanças para que ele não se sinta pressionado, E por fim, reforce com elogios quando ele demonstrar capacidade de fazer mudanças."
  }
]

export const funcaoExecPrimeiroGrupoPerguntas = ["compartilha_brinquedos", "consegue_esperar", "faz_necessario"];
export const funcaoExecSegundoGrupoPerguntas = ["cumpre_ordens", "lembra_orientacoes", "lembra_atividade"];
export const funcaoExecTerceiroGrupoPerguntas = ["ajuste_mudancas", "recuperacao_rapida", "mudar_brincadeira"];