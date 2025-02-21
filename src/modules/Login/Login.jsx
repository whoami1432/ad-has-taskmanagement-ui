import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import Swal from "sweetalert2";

import loginImage from "../../images/login.jpg";
import CustomTextField from "../../commonComponent/TextField";

import { apiBaseUrl } from "../../config";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const onSave = () => {
    axios
      .post(`${apiBaseUrl}/api/user/login`, {
        email: user,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        const { token } = response.data;
        console.log(token);

        localStorage.setItem("token", token);
        Swal.fire({
          timer: 500,
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in.",
        }).then(() => {
          window.location.href = "/tasklist"; // Change this to your target page
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
        });
      });
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          gap: 4,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            contentAlign: "rights",
          }}
        >
          <div>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              Login
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: "left" }}>
              Don&apos;t have an account yet?{" "}
              <Link to="/register">Register</Link>
            </Typography>
          </div>

          <CustomTextField
            label="Email Address"
            type="email"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <br />
          <CustomTextField
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "blue" }}
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            disabled={!user || !password}
            sx={{
              mt: 2,
              bgcolor: "purple",
              "&:hover": { bgcolor: "darkpurple" },
            }}
            onClick={() => onSave()}
          >
            Login
          </Button>

          <Typography align="center" sx={{ my: 2 }}>
            or login with
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none" }}
            >
              Facebook
            </Button>
          </Box>
        </Box>

        {/* Illustration Section */}
        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
          <img src={loginImage} alt="Illustration" style={{ width: "100%" }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
