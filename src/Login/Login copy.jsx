import React, { useState, useRef, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import styles from "./Login.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { api, authenticateUser } from "../CommonUtitlites/AxiosSetup/axiosDefault";
import setTokenAndRole from "../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";

export default function Login() {
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const toLowerCase = (str) => {
    return str.toLowerCase();
  };
  const [mobileNumber, setMobileNumber] = useState("");
  useEffect(() => {
   
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
            navigate(`/user/${toLowerCase(link.nameOfComponent)}/${link._id}`);
          }
        } else {
          if (localStorage.getItem("role") == "SuperUser") {
            navigate(`/admin/organisation`);
          }
        }
      }
    };
    checkAlreadyLoggedIn();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(formRef.current);
    // let formData = new FormData(e.target);
    // const email = formData.get("email");
    const mobile = formData.get("mobile");
    const password = formData.get("password");
    const otp = formData.get("oneTimePassword");
    try {
      console.log(mobile,password,otp)
      let result = await api.post(
        "/login-user",
        {
          // email: email,
          mobile: mobile,
          password: password,
          otp: otp,
        }
      );

      
      
      
      
      if (result && result.data && result.data.code !== 100) {
        alert(result.data.message);
        console.log(result.data);
        localStorage.setItem("user_Name", result.data.data.name);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_Id", result.data.data.id);
        localStorage.setItem("role", result.data.data.role);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "projectOfUser",
          JSON.stringify(result.data.data.projectsOfUser)
          );
          
          
      


        setTokenAndRole(result.data.data)
        authenticateUser(result.data.token)

        if(result.data.data.role == "SuperUser"){
          navigate("/admin/organisation");
        }

        let result2 = api.post('/get-user-role',{userId:result.data.data.id, role:result.data.data.role})
        result2 = await errorHandler(result2)
        let link = result2.data.data[0]
        console.log(link)

        if (localStorage.getItem("isAuthenticated")) {
         navigate(`/user/${toLowerCase(link.nameOfComponent)}/${link._id}`)
        
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
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
              <form ref={formRef} onSubmit={handleSubmit}>
                {/* ... (input fields) */}
                <div className="d-flex flex-column align-items-start mb-2">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number:
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobile No"
                    required
                    value={mobileNumber}
  onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column align-items-start mb-2">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    required
                  />
                </div>
                <div
                  className={`form-group input-wrapper mb-2 ${styles.otpInput}`}
                  style={{ display: showOtp ? "block" : "none" }}
                >
                  <label htmlFor="oneTimePassword">One Time Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oneTimePassword"
                    name="oneTimePassword"
                    placeholder="Enter OTP"
                  />
                  <span className="input-icon">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
                <div className="text-center mb-4">
                  <MDBBtn className="d-inline-block" size="lg" type="submit">
                    Login
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
            <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
              <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
            </MDBCol>
          </MDBRow>
          <button
                className="btn"
                style={{
                  marginLeft: "auto",
                  outline: "2px solid black",
                  marginTop: "1rem",
                }}
                onClick={() => {
                  if (mobileNumber) {
                    navigate(`/forgot?mobNumber=${mobileNumber}`);
                  } else {
                    Swal.fire({
                      timer:2000,
                      title:"Please enter a mobile number."
                    })
                  }
                }}
              >
                Forgot Password <i className="fa fa-sign-in" aria-hidden="true"></i>
              </button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    // <div className={styles.container}>
    //   <div className={styles.formContainer} id="form-container">
    //     <h4 className={styles.display_4}>Login</h4>
    //     <div>
    //     <form
    //       id="loginForm"
    //       className={styles.loginForm}
    //       onSubmit={handleSubmit}
    //     >
    //       <div className="input-wrapper form-group ">
    //         <label htmlFor="mobile">Mobile Number</label>
    //         <span className="input-icon">
    //           <i className="fas fa-mobile"></i>
    //         </span>
    //         <input
    //           type="tel"
    //           className="form-control"
    //           id="mobile"
    //           name="mobile"
    //           placeholder="Enter Mobile Number"
    //           required
    //         />
    //       </div>

    //       <div className="form-group input-wrapper mb-5">
    //         <label htmlFor="password">Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           id="password"
    //           name="password"
    //           placeholder="Password"
    //           required
    //         />
    //         <span className="input-icon">
    //           <i className="fas fa-lock"></i>
    //         </span>
    //       </div>
    //       <div
    //         className="form-group input-wrapper mb-4"
    //         style={{ display: showOtp ? "block" : "none" }}
    //       >
    //         <label htmlFor="oneTimePassword">One Time Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           id="oneTimePassword"
    //           name="oneTimePassword"
    //           placeholder="Enter OTP"
    //           // required
    //         />
    //         <span className="input-icon">
    //           <i className="fas fa-lock"></i>
    //         </span>
    //       </div>
    //       <button
    //         type="submit"
    //         id="loginBtn"
    //         style={{outline:"2px solid black"}}
    //         className="btn  btn-block mt-3"
    //       >
    //         Login
    //       </button>
    //     </form>
    //     <button
    //       className="btn"
    //       style={{
    //         marginLeft: "auto",
    //         outline: "2px solid black",
    //         marginTop: "1rem",
    //       }}
    //       onClick={() => navigate("/forgot")}
    //     >
    //       Forgot Password <i class="fa fa-sign-in" aria-hidden="true"></i>
    //     </button>
    //     </div>
    //   </div>
      
    // </div>
  );
}
