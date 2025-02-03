import React, { createContext, useContext } from 'react';

export interface Faculdade {
  id: string;
  nome: string;
  [key: string]: string;
}

export interface FaculdadeState {
  faculdadeSelecionada: Faculdade | null;
}

interface FaculdadeContextType {
  stateFaculdade: FaculdadeState;
  dispatchFaculdade: React.Dispatch<FaculdadeAction>;
}

type FaculdadeAction =
  | { type: 'SET_FACULDADE_SELECIONADA'; payload: Faculdade | null }

export const faculdadeInitialState: FaculdadeState = {
  faculdadeSelecionada: null
};

export const faculdadeReducer = (state: FaculdadeState, action: FaculdadeAction): FaculdadeState => {
  switch (action.type) {
    case 'SET_FACULDADE_SELECIONADA':
      return {
        ...state,
        faculdadeSelecionada: action.payload,
      };
    default:
      return state;
  }
}

export const FaculdadeContext = createContext<FaculdadeContextType | undefined>(undefined);

export const useFaculdadeContext = (): FaculdadeContextType => {
  const context = useContext(FaculdadeContext);
  if (context === undefined) {
    throw new Error('useFaculdadeContext must be used within an FaculdadeProvider');
  }
  return context;
};