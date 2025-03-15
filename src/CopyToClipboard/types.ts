import { CSSProperties } from "react";

export interface ICopyToClipboard {
  text: string;
  defaultColor?: CSSProperties["color"];
  copiedColor?: CSSProperties["color"];
}
