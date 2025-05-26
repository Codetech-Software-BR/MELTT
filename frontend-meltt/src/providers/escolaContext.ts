import React, { createContext, useContext } from 'react';

export interface Escola {
  id: string;
  nome: string;
  [key: string]: string;
}

export interface EscolaState {
  escolaSelecionado: Escola | null;
}

interface EscolaContextType {
  stateEscola: EscolaState;
  dispatchEscola: React.Dispatch<EscolaAction>;
}

type EscolaAction =
  | { type: 'SET_ESCOLA_SELECIONADO'; payload: Escola | null }

export const escolaInitialState: EscolaState = {
  escolaSelecionado: null,
};

export const escolaReducer = (state: EscolaState, action: EscolaAction): EscolaState => {
  switch (action.type) {
    case 'SET_ESCOLA_SELECIONADO':
      return {
        ...state,
        escolaSelecionado: action.payload,
      };
    default:
      return state;
  }
}

export const EscolaContext = createContext<EscolaContextType | undefined>(undefined);

export const useEscolaContext = (): EscolaContextType => {
  const context = useContext(EscolaContext);
  if (context === undefined) {
    throw new Error('useEscolaContext must be used within an EscolaProvider');
  }
  return context;
};