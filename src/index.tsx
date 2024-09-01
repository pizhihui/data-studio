import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import 'antd/dist/reset.css'

// import './locales/i18n.ts'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
