import ReactDOM from "react-dom/client";
import { CopyPasteButton } from "../src/index"; // Import from your local src

const App = () => {
  return (
    <div style={{ padding: 20, color: "red" }}>
      <h1>Component Preview!</h1>
      <CopyPasteButton text="some-text" />
    </div>
  );
};

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  console.error("Root element not found");
}
