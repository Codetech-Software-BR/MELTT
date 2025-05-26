import { styled, keyframes } from "@mui/system";


export const moveAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px); /* Move para a esquerda */
  }
  50% {
    transform: translateX(0); /* Volta para a posição original */
  }
  75% {
    transform: translateX(5px); /* Move para a direita */
  }
  100% {
    transform: translateX(0); /* Volta para a posição original */
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const PulsingSVG = styled('div')`
  animation: ${pulseAnimation} 2s infinite;
`;

export const PulsingMovingSVG = styled('div')`
  animation: ${pulseAnimation} 1s infinite, ${moveAnimation} 2s infinite; /* Dura 1 segundo e 2 segundos para o movimento */
`;
