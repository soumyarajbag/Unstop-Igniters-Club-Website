"use client";
import "../../app/globals.css";
import { useEffect } from "react";

const animation = () => {
  const blob = document.getElementById("blob");

  window.onpointermove = (event) => {
    const { clientX, clientY } = event;

    blob!.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 5000, fill: "forwards" }
    );
  };
};

export const Cursor = () => {
  useEffect(() => {
    animation();
  });

  return (
    <>
      <div
        className={`blob fixed -left-1/2 -top-1/2 h-[10vmax] bg-orange-origin blur-2xl dark:h-[7vmax] dark:bg-white-origin dark:blur-3xl`}
        id="blob"
      />
    </>
  );
};

export default Cursor;
