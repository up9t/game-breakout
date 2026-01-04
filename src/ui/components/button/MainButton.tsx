import type { ReactNode } from "preact/compat";
import type { ButtonHTMLAttributes } from "preact";
import "./MainButton.css";

type Props = {
  noBackground?: boolean;
  transparent?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const MainButton = ({
  noBackground = true,
  transparent,
  children,
  ...rest
}: Props) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      {!noBackground && <div className="main-button-background"></div>}
      <button
        className="main-button"
        {...rest}
        style={{
          backgroundColor: transparent ? "#1a1a1aca" : undefined,
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default MainButton;
