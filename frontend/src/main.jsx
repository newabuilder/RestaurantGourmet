import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Main from './components/Main/Main.jsx';   

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Main />
  </StrictMode>,
)
