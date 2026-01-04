import {
  type Dispatch,
  type StateUpdater,
  useContext,
  useState,
} from "preact/hooks";
import { entry } from "../../states.ts";
import { LevelDescriptorContext } from "../contexts/LevelContext.ts";
import MainButton from "./button/MainButton.tsx";

export default function MainMenu(props: {
  setState: Dispatch<StateUpdater<(typeof entry)[keyof typeof entry]>>;
  setLevel: Dispatch<StateUpdater<number>>;
}) {
  const { setLevel, setState } = props;

  const [isLevelSelection, setIsLevelSelection] = useState<boolean>(false);
  const levelDescriptor = useContext(LevelDescriptorContext);

  const showLevelSelection = () => {
    setIsLevelSelection(true);
  };

  const handleSelectLevel = (level: number) => {
    setLevel(level);
    setState(entry.IN_GAME);
  };

  return (
    <div>
      {isLevelSelection ? (
        <h1
          className="font-extrabold mb-4"
          style={{
            fontSize: "3rem",
          }}
        >
          Choose a level
        </h1>
      ) : (
        <h1 className="font-extrabold mb-10">Welcome to Breakout!</h1>
      )}

      {!isLevelSelection && (
        <div
          style={{
            width: "clamp(100px,100%,400px)",
            margin: "0 auto",
          }}
        >
          <MainButton
            type="button"
            onClick={showLevelSelection}
            transparent
            noBackground={false}
          >
            Play
          </MainButton>
        </div>
      )}

      {isLevelSelection && (
        <div
          className="z-10"
          style={{
            border: "1px solid #aaa",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {levelDescriptor.levels.map((level) => (
            <button
              type="button"
              key={level.path}
              onClick={() => handleSelectLevel(level.level)}
            >
              <div>Level {level.level}</div>
            </button>
          ))}
        </div>
      )}

      {/* <div>Setting</div> */}
      {/* <div>Custom Level</div> */}
    </div>
  );
}
