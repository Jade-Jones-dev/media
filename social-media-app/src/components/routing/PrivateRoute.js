import { UseNavigate, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false)
return (
    auth ? <Outlet/> : navigate('/login')
  )
}
export default PrivateRoutes
