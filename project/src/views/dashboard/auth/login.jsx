import React, { useState } from "react";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import { Formik, Form, Field } from "formik";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../../../assets/images/logo-full.png";
import login1 from "../../../assets/images/login/1.png";
import login2 from "../../../assets/images/login/2.png";
import login3 from "../../../assets/images/login/3.png";
import InputText from "../../../components/InputText";
import PasswordInput from "../../../components/passwordInput";
import { Stack } from "@mui/material";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import axios from "axios";
import {
  loginSchema,
  registerCompanySchema,
  registerUserSchema,
} from "../../../schemas/user.schema";
import { login, registerCompany, registerUser } from "../../../api/auth";
import google_logo from "../../../assets/images/icon-1.png";
const initialValues = {
  password: "",
  email: "",
};
// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Register = () => {
  const navigate = useNavigate();

  function handleSave(data) {
    localStorage.setItem("myData", JSON.stringify(data));
  }

  const [done, setDone] = useState(false);
  var response = {};
  return (
    <>
      <section className="sign-in-page ">
        <div id="container-inside" className="d-flex align-content-center">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters h-auto  align-content-center">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image
                        src={login1}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login2}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login3}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5  ">
              <div className="sign-in-from ">
                <h1 className="mb-0 text-center">Login</h1>
                <p className="text-center">
                  Discover new opportunities everyday{" "}
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={loginSchema}
                  onSubmit={async (values, { errors, setErrors }) => {
                    try {
                      console.log(values);
                      const response = await login(values);
                      handleSave(response.data);
                      console.log(response.status);
                      if (response.status !== 200) {
                        setErrors({
                          email: "wrong password or email",
                          password: "wrong password or email",
                        });
                        return;
                      }
                      if (response.data.user.role == "user") {
                        navigate("/")
                      }
                      if (response.data.user.role == "expert") {
                        navigate("/")
                      }
                      if (response.data.user.role == "company") {
                        navigate("/")
                      }
                      if (response.data.user.role == "admin") {
                        navigate("/dashboard");
                      } else {
                        navigate("/");
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Grid container component="main" sx={{ height: "100vh" }}>
                      {/* <CssBaseline /> */}

                      <Grid item xs={12} sm={8} md={12}>
                        <Box
                          sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ mb: 2 }} />
                          <Form>
                            <Stack sx={{ mt: 1, width: "100%" }} spacing={2}>
                              <InputText
                                type="text"
                                name="email"
                                placeholder="Email"
                              />
                              <PasswordInput
                                name="password"
                                placeholder="Password"
                              />

                              <div className="form-check d-flex align-items-center justify-content-between text-left mb-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input mb-1"
                                  id="exampleCheck5"
                                />
                                <p
                                  style={{
                                    fontSize: "13px",
                                    color: "#adb5bd",
                                    fontWeight: "bold",
                                  }}
                                  className="form-check-label font-xsss text-grey-500"
                                >
                                  Remember me
                                </p>
                                <Link
                                  style={{ fontSize: "13px", color: "#495057" }}
                                  to="/auth/forgetPassword"
                                  className="fw-600 font-xsss  mt-1 float-right"
                                >
                                  Forgot your Password?
                                </Link>
                                {/* <Grid container>
                      <Grid item xs>
                        <Link
                          component={RouteLink}
                          to="/resetPassword"
                          variant="body2"
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid> */}
                              </div>
                              <Button
                                // href="/account"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2, width: "23rem" }}
                                type="submit"
                                className="bg-dark py-3 text-white w-600"
                              >
                                Login
                              </Button>

                              <h6
                                style={{
                                  fontSize: "14px",
                                  color: "#adb5bd",
                                  fontWeight: "bold",
                                }}
                                className="text-grey-500 mt-3 font-xsss fw-500 mt-0 mb-0 lh-32"
                              >
                                Dont have account{" "}
                                <Link
                                  to="/auth/register"
                                  className="fw-700 ml-2 ms-1"
                                  onClick={() => {}}
                                >
                                  {" "}
                                  Register
                                </Link>
                              </h6>
                              <hr />
                              <div className="col-sm-12 mt-2 p-0 text-center mt-2">
                                <h6
                                  style={{
                                    fontSize: "13px",
                                    color: "#adb5bd",
                                    fontWeight: "bold",
                                  }}
                                  className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3"
                                >
                                  Or, Sign in with your social account{" "}
                                </h6>
                                <div
                                  style={{
                                    color: "black",
                                    borderRadius: "5px",
                                    border: "1px solid black",
                                    textAlign: "center",
                                  }}
                                  className="form-group mb-1 py-2 "
                                  id="signInDiv"
                                >
                                  <Link
                                    to="/auth/login"
                                    className="form-control py-0 style2-input text-black fw-600 bg-facebook border-0 p-0 mb-2"
                                  >
                                    <img
                                      src={google_logo}
                                      alt="icon"
                                      className="ms-2 w40 mb-1"
                                    />{" "}
                                    Sign in with Google
                                  </Link>
                                </div>
                              </div>
                            </Stack>
                          </Form>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
