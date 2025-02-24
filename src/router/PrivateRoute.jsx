import { Navigate, useLocation } from 'react-router-dom'
import Loader from '@/shared/LoaderSpinner'
import useAuth from '@/hooks/useAuth'
import PropTypes from 'prop-types'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="flex items-center justify-center gap-3 h-screen"> <Loader /> </div>
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures that children is a valid React node
}

export default PrivateRoute
