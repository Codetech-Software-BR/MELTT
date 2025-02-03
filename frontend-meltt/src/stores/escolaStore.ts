import { makeAutoObservable } from "mobx";

class EscolaStore {
  escolas = [];
  escolaSelecionada = null;

  constructor() {
    makeAutoObservable(this);
  }

  setEscola(escolas: any) {
    this.escolas = escolas;
  }

  setSelecionarEscola(escolaSelecionada: any) {
    if (escolaSelecionada) {
      this.escolaSelecionada = escolaSelecionada;
    } else {
      console.error("Tentando setar uma escola inválida");
    }
  }
}

const escolaStore = new EscolaStore();
export default escolaStore;
