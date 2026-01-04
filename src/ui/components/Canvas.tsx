import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { GameReadyEvent } from "../../events/game.ts";
import { KeyDownEvent, KeyUpEvent } from "../../events/input.ts";
import Game from "../../game.ts";
import { CurrentLevelContext } from "../contexts/LevelContext.ts";
import { ModalContext } from "../contexts/ModalContext.tsx";

export default function Canvas() {
  const level = useContext(CurrentLevelContext);
  const { showModal } = useContext(ModalContext);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [restartKey, setRestartKey] = useState<number>(0); // Per forzare re-render
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);

  const handleRestart = () => {
    setGameStarted(false);
    setRestartKey((prev) => prev + 1); // Forza ricreazione del game
  };

  useEffect(() => {
    if (Number.isInteger(level) && canvasRef.current !== null) {
      const game = new Game({ level, canvasRef: canvasRef });
      gameRef.current = game;

      // Passa la funzione showModal con callback di restart
      game.setModalFunction((message: string, isWin: boolean) => {
        showModal(message, isWin ? undefined : handleRestart);
      });

      const handleKeyDown = (ev: KeyboardEvent) =>
        game.dispatchEvent(new KeyDownEvent(ev));
      const handleKeyUp = (ev: KeyboardEvent) =>
        game.dispatchEvent(new KeyUpEvent(ev));

      addEventListener("keydown", handleKeyDown);
      addEventListener("keyup", handleKeyUp);

      game.dispatchEvent(new GameReadyEvent());

      // Cleanup
      return () => {
        removeEventListener("keydown", handleKeyDown);
        removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [level, canvasRef, showModal, restartKey]); // Aggiungi restartKey alle dipendenze

  useEffect(() => {
    if (gameStarted) return;

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.code === "Space") {
        setGameStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted]);

  return (
    <>
      <h1 className="mb-8 font-extrabold">Level {level}</h1>
      <canvas ref={canvasRef} className="min-w-[400px] w-[80vw]"></canvas>
      {!gameStarted && (
        <p className="mt-8">Press the space bar to start the game.</p>
      )}
    </>
  );
}
