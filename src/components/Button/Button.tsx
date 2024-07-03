import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  onClick?: () => void;
}

function Button({ children, color, onClick }: Props) {
  return (
    <button
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
