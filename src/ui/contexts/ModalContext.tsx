// contexts/ModalContext.tsx
import { createContext } from "preact";

interface ModalContextType {
  showModal: (message: string, onClose?: () => void) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});
