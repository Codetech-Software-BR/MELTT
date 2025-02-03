import { makeAutoObservable } from 'mobx';

class ConteudoStore {
  conteudos = [];
  conteudoSelecionado = null;

  constructor() {
    makeAutoObservable(this);
  }

  setConteudos(conteudos: any) {
    this.conteudos = conteudos;
  }

  selecionarConteudo(conteudo: any) {
    this.conteudoSelecionado = conteudo;
  }

  limparConteudoSelecionado() {
    this.conteudoSelecionado = null;
  }
}

const conteudoStore = new ConteudoStore();
export default conteudoStore;
