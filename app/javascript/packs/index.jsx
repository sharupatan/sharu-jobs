// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

document.addEventListener("DOMContentLoaded", () => {
  createRoot(document.body.appendChild(document.createElement("div"))).render(
    <GoogleOAuthProvider clientId={"689646448720-thkacsnomihoui518pnnt23ujrsb58p7.apps.googleusercontent.com"}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  );
});
