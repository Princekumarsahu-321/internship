import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { useDispatch, useSelector } from "react-redux";
import { getGoogleLogin, getLogin } from "../../store/User/user-action";
import { userActions } from "../../store/User/user-slice";

const googleClientId =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "47850225611-mgaf0pvnvi15e981pk6docgh09p4ee8h.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated, errors, loading } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getLogin({ email, password }));
  };

  const handleGoogleSuccess = (response) => {
    if (!response?.credential) {
      toast.error("Google login failed");
      return;
    }

    dispatch(getGoogleLogin({ credential: response.credential }));
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      toast.error(errors);
      dispatch(userActions.clearErrors());
    } else if (isAuthenticated) {
      toast.success("User logged successfully");
      navigate("/");
    }
  }, [dispatch, isAuthenticated, errors, navigate]);

  return (
    <Fragment>
      <div className="row wrapper">
        {loading && <LoadingSpinner />}
        {!loading && (
          <div className="col-10 col-lg-5">
            <form onSubmit={submitHandler}>
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/user/forgotPassword" className="float-right mb-4">
                Forgot Password?
              </Link>

              <button
                id="login_button"
                type="submit"
                className="loginbutton btn-block py-3"
              >
                LOGIN
              </button>

              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-muted">OR</span>
                <hr className="flex-grow-1" />
              </div>

              <div className="d-flex justify-content-center">
                <GoogleOAuthProvider clientId={googleClientId}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google login failed")}
                    width="300"
                    theme="outline"
                    size="large"
                  />
                </GoogleOAuthProvider>
              </div>

              <Link to="/signup" className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
