import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

if("serviceWorker" in navigator) {
  console.log("yes")
  navigator.serviceWorker.register("/service-worker.js")
    .then(registration => {
      console.log(registration)
    })
    .catch(err => {
      console.log("didnt work:", err)
    })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
