declare module "react-simple-copy-to-clipboard" {
    import { FC, CSSProperties } from "react";

    export interface ICopyToClipboard {
    text: string;
    defaultColor?: CSSProperties["color"];
    copiedColor?: CSSProperties["color"];
    }
  
    const CopyToClipboard: FC<CopyPasteButtonProps>;
    export default CopyToClipboard;
  }
  