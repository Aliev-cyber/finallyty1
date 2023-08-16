import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import TracksContext from "./contexts/TracksContext";
import CommentContext from "./contexts/CommentContext";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthContext>
      <TracksContext>
      <CommentContext>
        <App />
      </CommentContext>
      </TracksContext>
    </AuthContext>
  </BrowserRouter>
);
