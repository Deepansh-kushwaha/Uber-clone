import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router'
import 'remixicon/fonts/remixicon.css'
import UserContext from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <UserContext>
    <Router>
    <App />
    </Router>
    </UserContext>
  </StrictMode>,
)
