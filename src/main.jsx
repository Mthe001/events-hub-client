import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './provider/theme-provider'
import AuthProvider from './provider/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import router from './router/routes'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>

          <ThemeProvider defaultTheme='light'>
            <RouterProvider router={router}></RouterProvider>
            <Toaster position='top-right' />
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
