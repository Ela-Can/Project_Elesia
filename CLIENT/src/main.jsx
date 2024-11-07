import { Provider } from "react-redux";
import store from "./StoreRedux/index.js";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import SubjectProvider from "./StoreContext/subject/Context.jsx";

import App from "./App.jsx";
import "./assets/index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SubjectProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SubjectProvider>
  </Provider>
);
