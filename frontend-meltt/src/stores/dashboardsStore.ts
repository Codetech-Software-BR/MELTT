import { makeAutoObservable } from 'mobx';

class DashboardStore {
  dados = {};

  constructor() {
    makeAutoObservable(this);
  }

  setDados(dados: any) {
    this.dados = dados;
  }

  limparDados() {
    this.dados = {};
  }
}

const dashboardStore = new DashboardStore();
export default dashboardStore;
