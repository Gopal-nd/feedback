import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Widget from './components/Widget.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Widget projectId="1"/>
  </StrictMode>,
)
