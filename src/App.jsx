import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Outlet } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/header';

function App() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />
  }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App