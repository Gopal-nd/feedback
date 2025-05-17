import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Widget from './components/Widget.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Widget />
  </StrictMode>,
)
