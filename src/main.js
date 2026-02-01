import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RDKitProvider } from './contexts/RDKitContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(RDKitProvider, null,
      React.createElement(App)
    )
  )
)
