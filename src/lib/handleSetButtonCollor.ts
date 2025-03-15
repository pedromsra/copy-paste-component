import { CSSProperties } from "react";

/**
 * handler to change the color in the sass
 *
 * @param color the color which will be setted in the sass
 */
export default function handleSetButtonColor(color: CSSProperties["color"] = "#000") {
  document.documentElement.style.setProperty("--button-color", color);
}
