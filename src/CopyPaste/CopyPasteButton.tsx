import { CSSProperties, memo, useLayoutEffect, useState } from "react";
import CopyPasteIcon from "./CopyPasteIcon";
import "./styles.sass";

function handleSetButtonColor(color: CSSProperties["color"] = "#000") {
  document.documentElement.style.setProperty("--button-color", color);
}

/**
 * Simple Copy Button with a simple color change when clicked,
 * after click the button turns disabled for 1 second
 *
 * @param text the text that should be copied to clip board
 * @param defaultColor the color of the Icon when the button render, without interaction
 * @param copiedColor the color of the Icon after the user interaction of click
 *
 */

function CopyPasteButton({
  text,
  defaultColor = "inherit",
  copiedColor = "#00FF00",
}: {
  text: string;
  defaultColor?: CSSProperties["color"];
  copiedColor?: CSSProperties["color"];
}) {
  /**
   * @state wasClicked only register if the button was clicked or not
   */
  const [wasClicked, setWasClicked] = useState(false);

  useLayoutEffect(() => {
    handleSetButtonColor(defaultColor);
  }, []);

  /**
   * click handler, changes the button icon color, copy to clipboard the content of text and
   * change the state of wasClicked to true, disabling the button, after 1 s the color back to
   * default and wasClicked back to false, releasing the button
   *
   */
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
      data-testid="copy-paste-button"
    >
      <CopyPasteIcon />
    </button>
  );
}

export default memo(CopyPasteButton);
