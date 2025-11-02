// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Context/ShopContext' // import your context provider
import { UserAuthProvider } from './Context/UserAuth.jsx'

createRoot(document.getElementById('root')).render(
  <UserAuthProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </UserAuthProvider>

)
