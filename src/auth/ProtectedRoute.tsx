import { useAuth0 } from "@auth0/auth0-react"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface Props {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) return <Navigate to="/" replace />

  return <>{children}</>
}

export default ProtectedRoute