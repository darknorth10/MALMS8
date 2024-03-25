import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AllRoutes from './routes/AllRoutes'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AllRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
