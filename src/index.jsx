import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

// Add a helper function to ensure localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const testKey = "__test__"
    localStorage.setItem(testKey, testKey)
    localStorage.removeItem(testKey)
    return true
  } catch (e) {
    return false
  }
}

// Initialize empty blogs array if it doesn't exist
if (isLocalStorageAvailable() && !localStorage.getItem("blogs")) {
  localStorage.setItem("blogs", JSON.stringify([]))
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

