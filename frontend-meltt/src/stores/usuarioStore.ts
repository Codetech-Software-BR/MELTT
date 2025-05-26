import { makeAutoObservable } from 'mobx';

class UsuarioStore {
  usuarioLogado = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUsuario(usuario: any) {
    this.usuarioLogado = usuario;
  }

  limparUsuario() {
    this.usuarioLogado = null;
  }
}

const usuarioStore = new UsuarioStore();
export default usuarioStore;
