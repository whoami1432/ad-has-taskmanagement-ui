import { useState } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import registerPageImage from "../../images/register.jpg";
import CustomTextField from "../../commonComponent/TextField";

import { apiBaseUrl } from "../../config";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    country: "",
    city: "",
    password: "",
    state: "",
    gender: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiBaseUrl}/api/user/register`, formData)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: response.message,
          });
          return;
        }
        Swal.fire({
          timer: 3000,
          icon: "success",
          title: "Register Success",
          text: response.message,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.response.data.message,
        });
      });
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={registerPageImage}
              alt="Illustration"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
            <Typography variant="h5" gutterBottom color="black">
              Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Left Side Fields */}
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    error={formData.name.length < 3}
                    helperText={
                      formData.name.length < 3
                        ? "Name should be at least 3 characters"
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    name="email"
                    type="email"
                    error={!formData.email}
                    helperText={!formData.email ? "Email is required" : ""}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    error={!formData.country}
                    helperText={!formData.country ? "Country is required" : ""}
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={formData.password.length < 6}
                    helperText={
                      formData.password.length < 6
                        ? "Password should be at least 6 characters"
                        : ""
                    }
                    required
                  />
                </Grid>

                {/* Right Side Fields */}
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="State"
                    name="state"
                    type="tel"
                    value={formData.state}
                    onChange={handleChange}
                    error={!formData.state}
                    helperText={!formData.state ? "State is required" : ""}
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Phone Number"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    error={
                      formData.mobileNumber.length < 10 ||
                      formData.mobileNumber.length > 10
                    }
                    helperText={
                      formData.mobileNumber.length < 10 ||
                      formData.mobileNumber.length > 10
                        ? "Phone number should be 10 digits"
                        : ""
                    }
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={!formData.city}
                    helperText={!formData.city ? "City is required" : ""}
                    required
                  />
                  <CustomTextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    error={formData.password !== formData.confirmPassword}
                    helperText={
                      formData.password !== formData.confirmPassword
                        ? "Password does not match"
                        : ""
                    }
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormLabel component="legend" sx={{ color: "black" }}>
                    Gender
                  </FormLabel>
                </Grid>
                <Grid item xs={12} sm={11}>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label={<span style={{ color: "black" }}>Male</span>}
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label={<span style={{ color: "black" }}>Female</span>}
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label={<span style={{ color: "black" }}>Other</span>}
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Next Step
              </Button>
            </form>
            <br />
            <Typography
              variant="body2"
              sx={{ mb: 2, color: "black", textAlign: "left" }}
            >
              Don&apos;t have an account yet? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegistrationForm;
