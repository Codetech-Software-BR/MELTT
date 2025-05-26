import React, { createContext, useContext } from 'react';

interface Aluno {
  id: string;
  nome: string;
  [key: string]: string;
}

export interface ProfessorState {
  professorSelecionado: Aluno | null;
  tipoInformacao: string;
}

interface ProfessorContextType {
  stateProfessor: ProfessorState;
  dispatchProfessor: React.Dispatch<ProfessorAction>;
}

type ProfessorAction =
  | { type: 'SET_PROFESSOR_SELECIONADO'; payload: Aluno | null }
  | { type: 'SET_TIPO_INFORMACAO'; payload: string }

export const professorInitialState: ProfessorState = {
  professorSelecionado: null,
  tipoInformacao: 'pei',
};

export const professorReducer = (state: ProfessorState, action: ProfessorAction): ProfessorState => {
  switch (action.type) {
    case 'SET_PROFESSOR_SELECIONADO':
      return {
        ...state,
        professorSelecionado: action.payload,
      };
    case 'SET_TIPO_INFORMACAO':
      return {
        ...state,
        tipoInformacao: action.payload,
      };
    default:
      return state;
  }
}

export const ProfessorContext = createContext<ProfessorContextType | undefined>(undefined);

export const useProfessorContext = (): ProfessorContextType => {
  const context = useContext(ProfessorContext);
  if (context === undefined) {
    throw new Error('useProfessorContext must be used within an ProfessorProvider');
  }
  return context;
};