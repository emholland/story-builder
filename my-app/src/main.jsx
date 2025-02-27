import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AgentScreen from './AgentScreen.jsx'
import Home from './assets/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppScreen />
  </StrictMode>,
)
