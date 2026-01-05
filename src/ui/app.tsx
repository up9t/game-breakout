import { useState, useMemo } from "preact/hooks";
import "./css/app.css";
import LevelDescriptor from "../levels/level.metadata.json";
import { entry } from "../states.ts";
import Canvas from "./components/Canvas.tsx";
import MainMenu from "./components/MainMenu.tsx";
import {
  CurrentLevelContext,
  LevelDescriptorContext,
} from "./contexts/LevelContext.ts";
import { ModalContext } from "./contexts/ModalContext.tsx";

export function App() {
  const [entryState, setEntryState] = useState<
    (typeof entry)[keyof typeof entry]
  >(entry.IN_MENU);
  const [level, setLevel] = useState<number>(1);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalCallback, setModalCallback] = useState<(() => void) | null>(null);

  const modalContextValue = useMemo(
    () => ({
      showModal: (message: string, onClose?: () => void) => {
        setModalMessage(message);
        setModalCallback(() => onClose); // Wrap in arrow function per useState
      },
      hideModal: () => {
        setModalMessage(null);
        setModalCallback(null);
      },
    }),
    []
  );

  const handleModalClose = () => {
    setModalMessage(null);
    if (modalCallback) {
      modalCallback();
      setModalCallback(null);
    }
  };

  return (
    <LevelDescriptorContext value={LevelDescriptor}>
      <ModalContext.Provider value={modalContextValue}>
        {modalMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay scuro */}
            <div
              className="absolute inset-0 bg-black bg-opacity-70"
              onClick={handleModalClose}
            ></div>

            {/* Modal content */}
            <div className="relative bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4">
              <p className="text-lg text-gray-800 mb-6 text-center">
                {modalMessage}
              </p>
              <button
                onClick={handleModalClose}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}

        {entryState === entry.IN_MENU && (
          <MainMenu setState={setEntryState} setLevel={setLevel} />
        )}
        {entryState === entry.IN_GAME && (
          <CurrentLevelContext value={level}>
            <Canvas />
          </CurrentLevelContext>
        )}
      </ModalContext.Provider>
    </LevelDescriptorContext>
  );
}
