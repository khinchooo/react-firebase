import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Box, Container, TextField, Avatar, Typography, CssBaseline } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => setError(error.message));
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  };

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
            <TextField
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChangeEmail}
              fullWidth
              margin="normal"
              label="メールアドレス"
              required
              autoFocus
            />
            <TextField
              type="password"
              name="password"
              onChange={handleChangePassword}
              fullWidth
              margin="normal"
              label="パスワード"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <div>
            ユーザ登録は
              <Link to={'/signup'}>こちら</Link>から
            </div>
            </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;