import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import spotifyImg from "../Photos/spotify-icon.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { useAuthContext } from "../contexts/AuthContext";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const {user, login} = useAuthContext()
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get("username"),
      password: data.get("password"),
    });
  };
	if (user) {
		return <Navigate to="/" />;
	}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ display: "flex", gap: "5px", cursor:'pointer' }}
            component="h1"
            variant="h4"
            color="white"
            onClick={() => navigate("/")}
          >
            Sign in{" "}
            <img
              src={spotifyImg}
              alt="spotify logo"
              style={{ width: "40px" }}
            />{" "}
            Spotify
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              placeholder="Username"
              style={{
                background: "white",
                borderRadius: "4px",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{
                background: "white",
                borderRadius: "4px",
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: "#00e676" }}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
              style={{ color: "white" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: "white", color: "black" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/404poka_shto" variant="body2" style={{ color: "white" }}>
                  {"Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/auth" variant="body2" style={{ color: "white" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
