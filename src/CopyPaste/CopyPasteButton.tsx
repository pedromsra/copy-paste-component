import { CSSProperties, memo, useLayoutEffect, useState } from "react";
import CopyPasteIcon from "./CopyPasteIcon";
import "./styles.sass";

function handleSetButtonColor(color: CSSProperties["color"] = "#000") {
  document.documentElement.style.setProperty("--button-color", color);
}

function CopyPasteButton({
  text,
  defaultColor = "inherit",
  copiedColor = "#00FF00",
}: {
  text: string;
  defaultColor?: CSSProperties["color"];
  copiedColor?: CSSProperties["color"];
}) {
  const [wasClicked, setWasClicked] = useState(false);

  useLayoutEffect(() => {
    handleSetButtonColor(defaultColor);
  }, []);

  function handleClick() {
    setWasClicked(true);
    handleSetButtonColor(copiedColor);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setWasClicked(false);
      handleSetButtonColor(defaultColor);
    }, 1000);
  }
  return (
    <button
      onClick={handleClick}
      disabled={wasClicked}
    >
      <CopyPasteIcon />
    </button>
  );
}

export default memo(CopyPasteButton);
