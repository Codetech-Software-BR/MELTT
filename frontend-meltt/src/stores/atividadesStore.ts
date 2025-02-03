

import { makeAutoObservable } from 'mobx';

class AtividadeStore {
  atividades = [];
  atividadeSelecionada = null;

  constructor() {
    makeAutoObservable(this);
  }

  setAtividades(atividades: any) {
    this.atividades = atividades;
  }

  selecionarAtividade(atividade: any) {
    this.atividadeSelecionada = atividade;
  }

  limparAtividadeSelecionada() {
    this.atividadeSelecionada = null;
  }
}

const atividadeStore = new AtividadeStore();
export default atividadeStore;
