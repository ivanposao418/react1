import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App2.tsx'
//import App from './App1withHook.tsx'
//import App from "./App1withHook.tsx";
//import App from "./App2withSearchHook.tsx";
import App from "./App3forms-with-patterns.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
