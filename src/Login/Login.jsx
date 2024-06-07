import React, { useState, useRef } from "react";
import { Button, Container, Grid, TextField, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api, authenticateUser } from "../CommonUtitlites/AxiosSetup/axiosDefault";
import setTokenAndRole from "../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";

export default function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [mobileNumber, setMobileNumber] = useState("");

  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  const handleSubmit = async (e) => {
    console.log("Here")
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const mobile = formData.get("mobile");
    const password = formData.get("password");
    const otp = formData.get("oneTimePassword");

    try {
      let result = await api.post("/login-user", {
        mobile: mobile,
        password: password,
        otp: otp,
      });

      if (result && result.data && result.data.code !== 100) {
        alert(result.data.message);
        localStorage.setItem("user_Name", result.data.data.name);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_Id", result.data.data.id);
        localStorage.setItem("role", result.data.data.role);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("projectOfUser", JSON.stringify(result.data.data.projectsOfUser));

        setTokenAndRole(result.data.data);
        authenticateUser(result.data.token);

        if (result.data.data.role === "SuperUser") {
          navigate("/admin/organisation");
        }

        let result2 = api.post("/get-user-role", { userId: result.data.data.id, role: result.data.data.role });
        result2 = await errorHandler(result2);
        let link = result2.data.data[0];

        if (localStorage.getItem("isAuthenticated")) {
          navigate(`/user/${toLowerCase(link.nameOfComponent)}/${link._id}`);
        }
      } else if (result && result.data.code === 100) {
        alert(result.data.message);
        setShowOtp(true);
      }
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <Container>
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item md={4}>
        <Card elevation={5} sx={{ padding:"1em 4em", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CardContent>
            <Typography variant="h4" color="primary" fontWeight="bold" mb={3}>
              Login
            </Typography>
            <form ref={formRef} onSubmit={handleSubmit}>
              <TextField
                type="tel"
                name="mobile"
                label="Mobile Number"
                placeholder="Enter Mobile No"
                required
                variant="standard"
                fullWidth
                sx={{ mb: 5 }}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <TextField
                type="password"
                variant="standard"
                name="password"
                fullWidth
                label="Password"
                placeholder="Enter Password"
                required
                sx={{ mb: 5 }}
              />
              {showOtp && (
                <TextField
                  type="password"
                  variant="standard"
                  fullWidth
                  name="oneTimePassword"
                  label="One Time Password"
                  placeholder="Enter OTP"
                  sx={{ mb: 5 }}
                  required
                />
              )}
              <Box  sx={{display:'flex', flexDirection:'column'}}>
              <Button variant="contained" size="large" sx={{ mb: 2 }} type="submit">
                Login
              </Button>
              <Button
              variant="text"
              type='button'
              onClick={() => {
                if (mobileNumber) {
                  navigate(`/forgot?mobNumber=${mobileNumber}`);
                } else {
                  Swal.fire({
                    timer: 2000,
                    title: "Please enter a mobile number.",
                  });
                }
              }}
              sx={{ mt: 2 }}
            >
              Forgot Password
            </Button>
            </Box>
            </form>
           
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6} sx={{ display: {xs:"none", md:'flex'}, alignItems: "center", justifyContent: "center" }}>
          <CardMedia
            component="img"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="registration"
            sx={{ width: "100%", height: "auto" }}
          />
      </Grid>
    </Grid>
  </Container>
  );
}
