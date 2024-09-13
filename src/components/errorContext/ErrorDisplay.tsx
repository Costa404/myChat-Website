import React from "react";
import { useError } from "./useError";

const ErrorDisplay: React.FC = () => {
  const { error } = useError();

  return error ? (
    <div
      style={{
        width: "100vw",
        position: "absolute",
        backgroundColor: "red",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "2rem",
        display: "flex",
        justifyContent: "center",
        fontWeight: "600",
        opacity: "1",
        transition: "opacity 2s ease-out",
      }}
    >
      {error}
    </div>
  ) : null;
};

export default ErrorDisplay;
