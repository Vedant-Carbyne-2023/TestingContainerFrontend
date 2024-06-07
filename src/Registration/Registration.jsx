import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import CustomModal from "../CommonUtitlites/ModalPopUp/CustomModal";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
// import styles from "./Registration.module.css";
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Modal,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  createTxtFile,
  generateOTP,
  generatePassword,
} from "./registrationFunction.js";
import { errorHandler } from "../CommonUtitlites/Others/errorHandle";
import { role, userId } from "../CommonUtitlites/Others/commonExportVariable";
import Terms from "./Terms";

export default function Registration() {
  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [serialNumber, setSerialNumber] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roleParam = searchParams.get("role");
  const emailParam = searchParams.get("email");
  const [roleValue, setRoleValue] = useState(roleParam || "");
  const [emailValue, setEmailValue] = useState(emailParam || "");
  // for Terms and conditions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); // Track if terms are accepted

  const handleAcceptTerms = () => {
    console.log("came here now");
    setAcceptedTerms(true);
  };

  useEffect(() => {
    if (acceptedTerms) {
      setIsModalOpen(false);
      handleSubmit(); // Call handleSubmit without the event parameter
    }
  }, [acceptedTerms]);
  console.log("got params: ", roleParam, emailParam);

  useEffect(() => {
    const getAllRoles = async () => {
      {
        let result2 = api.post("/get-all-roles", {
          userName: "NewUser for Registration",
        });
        result2 = await errorHandler(result2);
        // Remove Admin from dropdown
        const filteredData = result2.data.data.filter(
          (item) => item.name !== "Admin"
        );
        setRoles(filteredData);
        console.log("all roles", result2.data.data);
        if (roleParam !== null) {
          for (const object of result2.data.data) {
            if (object._id === roleParam) {
              console.log("Role is:", object.name);
              setRoleValue(object.name); // Call your setRoleParamId function here
              break; // If you want to stop after the first match
            }
          }
        }
      }
    };
    if (!localStorage.getItem("user_Id") && !localStorage.getItem("role")) {
      getAllRoles();
    }

    const checkAlreadyLoggedIn = async () => {
      if (
        localStorage.getItem("role") &&
        localStorage.getItem("user_Id") &&
        localStorage.getItem("token")
      ) {
        console.log("alreadyLogin");
        if (localStorage.getItem("role") !== "SuperUser") {
          let result2 = api.post("/get-user-role", {
            userId: localStorage.getItem("user_Id"),
            role: localStorage.getItem("role"),
          });
          result2 = await errorHandler(result2);
          let link = result2.data.data[0];
          console.log(link);

          if (localStorage.getItem("isAuthenticated")) {
            navigate(`/user_${toLowerCase(link.nameOfComponent)}/${link._id}`);
          }
        } else {
          if (localStorage.getItem("role") == "SuperUser") {
            navigate(`/organisation`);
          }
        }
      }
    };
    checkAlreadyLoggedIn();
  }, []);

  const formRef = useRef(null); // Create a ref for the form

  const handleSubmit = async (e) => {
    console.log("here in handle submit");
    if (e) {
      e.preventDefault();
    }
    if (!acceptedTerms) {
      setIsModalOpen(true);
      console.log("not accepted terms yet");
      return; // Stop the handleSubmit if terms are not accepted
    }
    // // Generate OTP here
    // const generatedOtp = generateOTP();

    // // Generate Password here
    // const generatedPassword = generatePassword();

    let formData = new FormData(formRef.current);
    // const email = formData.get("email");
    const mobile = formData.get("mobile");
    const name = formData.get("name");
    const company = "Carbyne";
    const role = formData.get("role");
    // const otp = formData.get("otp");
    const email = formData.get("email");
    // const password = formData.get("password");
    const otp = generateOTP();
    const password = generatePassword();

    try {
      const currentSerialNumber = serialNumber + 1;
      setSerialNumber(currentSerialNumber);

      console.log(
        "check all details",
        currentSerialNumber,
        mobile,
        name,
        company,
        role,
        email,
        otp,
        password
      );
      let result = await api.post("/register-user", {
        serialNumber: currentSerialNumber,
        email,
        mobile,
        name,
        role,
        otp,
        password,
        company,
      });
      //   console.log(result)
      if (result && result.data && result.data.code === 200) {
        // alert(result.data.message);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Container >
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: { xs: "center", lg: "space-between" },
          }}
        >
          <Grid
            item
            md={6}
            lg={5}
            sx={{ display: {xs:"none", md:'flex'},alignItems: "center" }}
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="registration"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item md={4} mt={5}>

          <Card elevation={5} sx={{ padding:"1em 4em", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column" }}>

          
            <Typography
              variant="h4"
              color="primary"
              align="center"
              fontWeight="bold"
              mb={5}
             
              mt={{ xs: 3, md: 3 }}
            >
              Register
            </Typography>

            <form
              onSubmit={handleSubmit}
              ref={formRef}
              style={{ width: "100%" }}
            >
              <TextField
                id="role"
                name="role"
                select
                fullWidth
                label="Select Your Role"
                defaultValue="Please Select Your Role"
                // helperText="Please Select Your Role"
                required
                variant="standard"
                sx={{ textAlign: "left", mb: "1.5rem" }}
                disabled={roleParam !== null} // Disable the input if roleParam is present
                value={roleValue} // Set the value to roleParam if it exists
                onChange={(e) => setRoleValue(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem value={role.name}>{role.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                type="email"
                name="email"
                id="userEmail"
                label="Email"
                variant="standard"
                placeholder="Please Enter your email"
                required
                sx={{ textAlign: "left", mb: "1.5rem" }}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <TextField
                fullWidth
                type="text"
                name="name"
                id="userName"
                label="Name"
                variant="standard"
                sx={{ textAlign: "left", mb: "1.5rem" }}
                placeholder="Enter Name"
                required
              />
              <TextField
                fullWidth
                type="tel"
                name="mobile"
                id="mobile"
                label="Mobile No"
                variant="standard"
                sx={{ textAlign: "left", mb: "1.5rem" }}
                placeholder="Enter Mobile No."
                required
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my:'1rem',
                  
                }}
              >
                <Button variant="contained" size="small" type="submit" sx={{padding:'0 1em'}}>
                  Register
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => navigate("/login")}
                  size="small"
                >
                  Go To Login{" "}
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                </Button>
              </Box>
            </form>
          </Card>
          </Grid>
        </Grid>
      </Container>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Terms and Conditions"}
      >
        <Terms handleAccept={handleAcceptTerms} />
      </CustomModal>
    </>
  );
}
