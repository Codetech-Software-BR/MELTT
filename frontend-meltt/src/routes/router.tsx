import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import CadastroPage from "../pages/cadastro";
import RedefinirSenhaPage from "../pages/redefinir-senha";
import AlunosPage from "../pages/alunos";
import AlunosPageEdit from "../pages/alunos/edit";
import LoginPage from "../pages/login";
import EsqueciMinhaSenhaPage from "../pages/esqueci-minha-senha";
import NovaSenhaPage from "../pages/nova-senha";
import SenhaAlteradaSucessoPage from "../pages/senha-alterada-sucesso";
import SupportPage from "../pages/support";
import SplashScreen from "../pages/splash";
import TurmasPage from "../pages/turmas";
import PagamentosPage from "../pages/pagamentos";
import EventosPage from "../pages/eventos";
import FornecedoresEditPage from "../pages/fornecedores/edit";
import TurmasPageEdit from "../pages/turmas/view";
import TurmasPageNew from "../pages/turmas/new";
import PaginaDaTurmaPage from "../pages/turmas/view/paginaDaTurma";
import PaginadaTurmaCriarTopicoPage from "../pages/turmas/view/paginaDaTurma/topico/new";
import TopicoViewPage from "../pages/turmas/view/paginaDaTurma/topico/view";
import DashboardAlunosPage from "../pages/dashboards";
import DashboardFornecedoresPage from "../pages/dashboards/fornecedores";
import DashboardTurmasPage from "../pages/dashboards/turmas";
import ViewPagamentoPage from "../pages/pagamentos/view";
import AlunosPageView from "../pages/alunos/view";
import EventosPageEdit from "../pages/eventos/edit";
import ContratosPage from "../pages/contratos";
import ContratosEnvioPage from "../pages/contratos-envio";
import SplashGetBlingInfo from "../pages/splash/blingInfo";
import PreContratoPage from "../pages/pre-contratos";
import AdesoesPage from "../pages/adesoes";
import ContratosEventosPage from "../pages/contratos-eventos";
import TurmasEditPage from "../pages/turmas/edit";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/cadastro",
    element: <CadastroPage />,
  },
  {
    path: "/esqueci-minha-senha",
    element: <EsqueciMinhaSenhaPage />,
  },
  {
    path: "/nova-senha",
    element: <NovaSenhaPage />,
  },
  {
    path: "/redefinir-senha",
    element: <RedefinirSenhaPage />,
  },
  {
    path: "/senha-alterada-sucesso",
    element: <SenhaAlteradaSucessoPage />,
  },
  {
    path: "/splash",
    element: <SplashScreen />,
  },
  {
    path: "/splash-bling-info",
    element: <SplashGetBlingInfo />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/alunos" replace />,
      },
      {
        path: "/dashboard",
        element: <DashboardAlunosPage/>,
      },
      {
        path: "/dashboard/alunos",
        element: <DashboardAlunosPage/>,
      },
      {
        path: "/dashboard/fornecedor",
        element: <DashboardFornecedoresPage/>,
      },
      {
        path: "/dashboard/turma",
        element: <DashboardTurmasPage/>,
      },
      {
        path: "/alunos",
        element: <AlunosPage />,
      },
      {
        path: "/alunos/edit/:id?",
        element: <AlunosPageEdit />,
      },
      {
        path: "/alunos/view/:id?",
        element: <AlunosPageView />,
      },
      // {
      //   path: "/faculdades",
      //   element: <FaculdadesPage />,
      // },
      // {
      //   path: "/faculdades/edit/:id?",
      //   element: <FaculdadesPageEdit />,
      // },
      {
        path: "/turmas",
        element: <TurmasPage />,
      },
      {
        path: "/turmas/new",
        element: <TurmasPageNew />,
      },
      {
        path: "/turmas/edit/:id",
        element: <TurmasEditPage />,
      },
      // {
      //   path: "/turmas/view/:id",
      //   element: <TurmasPageEdit />,
      // },
      {
        path: "/turmas/view/:id/pagina-turma",
        element: <PaginaDaTurmaPage />,
      },
      {
        path: "/turmas/view/:id/pagina-turma/topico/new",
        element: <PaginadaTurmaCriarTopicoPage />,
      },
      {
        path: "/turmas/view/:id/pagina-turma/topico/:topicoId",
        element: <TopicoViewPage />,
      },
      {
        path: "/alunos",
        element: <AlunosPage />,
      },
      {
        path: "/pagamentos",
        element: <PagamentosPage />,
      },
      {
        path: "/pagamentos/view/:id",
        element: <ViewPagamentoPage />,
      },
      {
        path: "/fornecedores",
        element: <ContratosEventosPage/>
      },
      // {
      //   path: "/fornecedores",
      //   element: <FornecedoresPage/>
      // },
      {
        path: "/fornecedor/edit/:id?",
        element: <FornecedoresEditPage/>
      },
      {
        path: "/fornecedores/edit/:id?",
        element: <FornecedoresEditPage/>
      },
      {
        path: "/contratos-envio",
        element: <ContratosEnvioPage/>,
      },
      {
        path: "/eventos",
        element: <EventosPage/>,
      },
      {
        path: "/eventos/edit/:id?",
        element: <EventosPageEdit/>,
      },
      {
        path: "/adesoes",
        element: <AdesoesPage/>
      },
      {
        path: "/pre-contratos",
        element: <PreContratoPage/>,
      },
      {
        path: "/contratos",
        element: <ContratosPage/>
      },
      {
        path: "/suporte",
        element: <SupportPage/>,
      }
    ],
  },
]);
