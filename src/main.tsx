import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Changed from .css to .scss
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)