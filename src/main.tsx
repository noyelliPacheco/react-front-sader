import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AgriculturaApp } from './AgriculturaApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <AgriculturaApp />
  </StrictMode>,
)
