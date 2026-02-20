import { Auth0Provider } from "@auth0/auth0-react"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider