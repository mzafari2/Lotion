import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Editor from "./Editor";
import Preview from "./preview";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Editor edit={false} />} />
          {/* <Route path="/notes/:Id" element={<Editor edit={false} />} /> */}
          <Route path="/notes/" element={<Preview edit={false} />} />
          <Route path="/notes/:Id" element={<Preview edit={false} />} />
          <Route path="/notes/:Id/edit" element={<Editor edit={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
