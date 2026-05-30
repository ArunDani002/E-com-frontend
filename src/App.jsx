import React from 'react'
import Signin from './screens/auth/Signin'
import Router from './routes/Router'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    // <div>App</div>
    <>
      <ToastContainer />
      <Router />
    </>
  )
}

export default App