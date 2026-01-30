import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { UIProvider } from "@/shared/ui/uiStore";
import Toast from "@/shared/ui/Toast";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <UIProvider>
    <App />
    <Toast />
  </UIProvider>
  </StrictMode>
  </BrowserRouter>
)
