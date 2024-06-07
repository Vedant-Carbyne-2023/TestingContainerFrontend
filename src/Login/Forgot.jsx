import React, { useState } from "react";
import styles from "./Login.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { api, authenticateUser } from "../CommonUtitlites/AxiosSetup/axiosDefault";
import setTokenAndRole from "../CommonUtitlites/Others/commonExportVariable";
import { useLocation } from "react-router-dom";

export default function Forgot() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const queryParams = new URLSearchParams(location.search);
  console.log(queryParams)
  const mobileNumber = queryParams.get("mobNumber");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const email = formData.get("email");
    const mobile = mobileNumber;
    // const role = formData.get("role");
    try {
      console.log('got data:',mobile,email);
      let result = await api.post(
        "/create-request",
        {
          email: email,
          mobile: mobile,
          // role: role,
        }
      );
      if (result && result.data && result.data.code === 200) {
        alert(result.data.message);
        // making txt file for download
      }

      
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formContainer} id="form-container">
        <div className={styles.display_4}>
        <h4>Forgot</h4>
        <h4>Password</h4>
        </div>
        <div>
        <form
          id="forgotForm"
          className={styles.loginForm}
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper form-group mt-4">
            <label htmlFor="email">Email address</label>
            <span className="input-icon">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="input-wrapper form-group ">
            <label htmlFor="mobile">Mobile Number</label>
            <span className="input-icon">
              <i className="fas fa-mobile"></i>
            </span>
            <input
              type="tel"
              className="form-control"
              id="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              required
              readOnly
            />
          </div>

          {/* <div className="form-group input-wrapper mb-5">
            <label htmlFor="role">Role:</label>
                <select
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  placeholder="Enter Role"
                  required
                >
                  <option value="">Please Select your Role</option>
                  <option value="SuperUser">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Project On-Site Team">
                    Project On-Site Team
                  </option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Deputy Project Manager">
                    Deputy Project Manager
                  </option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Store Team Member">Store Team Member</option>
                </select>
          </div> */}
          {/* <div
            className="form-group input-wrapper mb-4"
            style={{ display: showOtp ? "block" : "none" }}
          >
            <label htmlFor="oneTimePassword">One Time Password</label>
            <input
              type="password"
              className="form-control"
              id="oneTimePassword"
              name="oneTimePassword"
              placeholder="Enter OTP"
              // required
            />
            <span className="input-icon">
              <i className="fas fa-lock"></i>
            </span>
          </div> */}
          <button
            type="submit"
            id="forgotBtn"
            style={{outline:"2px solid black"}}
            className="btn  btn-block mt-3"
          >
            Reset Password
          </button>
        </form>
        <button
          className="btn"
          style={{
            marginLeft: "auto",
            outline: "2px solid black",
            marginTop: "1rem",
          }}
          onClick={() => navigate("/login")}
        >
          Back To Login <i class="fa fa-sign-in" aria-hidden="true"></i>
        </button>
        </div>
      </div>
      
    </div>
  );
}
