import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
 import {CLERK_KEY}  from "../src/config.js"
const clerkKey = CLERK_KEY;
if (!clerkKey) {
  throw new Error("Missing Clerk publishable key in environment variables.");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ClerkProvider>
  </StrictMode>
);
