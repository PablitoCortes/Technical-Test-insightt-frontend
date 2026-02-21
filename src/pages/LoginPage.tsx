import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography, Container, Stack, useTheme } from "@mui/material"
import { Login as LoginIcon } from "@mui/icons-material"

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return (
      <Box display="flex" height="100vh" alignItems="center" justifyContent="center">
        <Typography variant="h6" color="text.secondary">Loading your workspace...</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 2% 2%, ${theme.palette.primary.main}08 0%, transparent 40%),
                     radial-gradient(circle at 98% 98%, ${theme.palette.primary.main}08 0%, transparent 40%)`
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={4} alignItems="center">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Tasker
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The minimalist workspace for your daily flow.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              p: 4,
              bgcolor: 'background.paper',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ mb: 3 }}>
              Welcome back
            </Typography>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<LoginIcon />}
              onClick={() => {
                console.log("clicked")
                loginWithRedirect()
              }}
              sx={{ py: 1.5 }}
            >
              Continue with Auth0
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
              Securely powered by Auth0
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default LoginPage