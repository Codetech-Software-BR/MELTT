import { makeAutoObservable } from 'mobx';

class AlunoStore {
  alunos = [];
  alunoSelecionado = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAlunos(alunos: any) {
    this.alunos = alunos;
  }

  selecionarAluno(aluno: any) {
    this.alunoSelecionado = aluno;
  }

  limparAlunoSelecionado() {
    this.alunoSelecionado = null;
  }
}

const alunoStore = new AlunoStore();
export default alunoStore;
