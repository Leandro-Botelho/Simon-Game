import React, { forwardRef } from "react";
import "./Boxs.sass";

type PropsButton = React.ComponentProps<"button"> & {
  onClick: (e: React.MouseEvent) => void;
  id: string;
  nameClass: string;
};

const Boxs = forwardRef<HTMLButtonElement | null, PropsButton>(
  ({ onClick, id, nameClass }, ref) => {
    return (
      <button
        className={`box${nameClass} box`}
        ref={ref}
        id={id}
        onClick={onClick}
      ></button>
    );
  }
);

export default Boxs;
