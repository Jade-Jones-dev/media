import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'

const PrivateRoutes = () => {
  const [auth, setAuth] = useState(false)


return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoutes
