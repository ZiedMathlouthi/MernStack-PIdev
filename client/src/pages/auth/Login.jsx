import React, { useState } from "react";
import Logo from "../../img/login.png";
import SignUp from "../../img/signUp.png";
import Forget from "../../img/forget.png";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import { register, signin } from "../../Actions/AuthActions.js";
const Login = () => {
  const initialState = {
    role: "user",
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
    adress: "",
    city: "",
    birthday: "",
    gender: "",
    competence: "",
    experience: "",
    verify: "",
    webSite: "",
    checkremember: "",
  };

  const [signUp, setSignUp] = useState(false);
  const [isForget, setIsForget] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [data, setData] = useState(initialState);

  const responseSuccessGoogle = (response) => {
    console.log("Success" + response);
  };

  const responseErrorGoogle = (error) => {
    console.log(error);
  };

  // const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signUp) {
      console.log(data);
      dispatch(register(data, navigate))
        .then((res) => console.log(res.data))
        .catch((err) => console.log({ msg: err.message }));
    } else if (isForget) {
      // dispatch(
      //   forgetPassword(data)
      //     .then((res) => res.status(200).send("Check your Email"))
      //     .catch((err) => console.log(err))
      // );
    } else if (isReset) {
      // dispatch(
      //   resetPassword(data)
      //     .then((res) => res.status(200).send("updated success"))
      //     .catch((err) => console.log(err))
      // );
    } else dispatch(signin(data, navigate));
  };
  const resetForm = () => {
    setData(initialState);
  };
  const elementsRole = (data) => {
    switch (data.role) {
      case "User":
        return (
          <div>
            <div className="inputBx">
              <span>Birthday</span>
              <input
                required
                placeholder="Enter your birthday"
                type="date"
                name="birthday"
                value={data.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="radio">
              <span>Gender</span>
              <input
                required
                type="radio"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
              <label>Homme</label>
              <input
                required
                type="radio"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
              <label>Femme</label>
            </div>
            <div className="inputBx">
              <span>Competence</span>
              <input
                required
                placeholder="Enter your competence"
                type="text"
                name="competence"
                value={data.competence}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <span>Expercience</span>
              <input
                required
                placeholder="Enter your experience"
                type="text"
                name="experience"
                value={data.experience}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case "Expert":
        return (
          <div>
            <div className="inputBx">
              <span>Birthday</span>
              <input
                required
                placeholder="Enter your birthday"
                type="date"
                name="birthday"
                value={data.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="radio">
              <span>Gender</span>
              <input
                required
                type="radio"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
              <label>Homme</label>
              <input
                required
                type="radio"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
              <label>Femme</label>
            </div>
            <div className="inputBx">
              <span>Competence</span>
              <input
                required
                placeholder="Enter your competence"
                type="text"
                name="competence"
                value={data.competence}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <span>Expercience</span>
              <input
                required
                placeholder="Enter your experience"
                type="text"
                name="experience"
                value={data.experience}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <span>Certificate expertize</span>
              <input
                required
                type="file"
                name="verify"
                value={data.verify}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case "Company":
        return (
          <div>
            <div className="inputBx">
              <span>Web Site</span>
              <input
                required
                placeholder="Enter your web site"
                type="text"
                name="webSite"
                value={data.webSite}
                onChange={handleChange}
              />
            </div>
            <div className="inputBx">
              <span>Register Commerce</span>
              <input
                required
                type="file"
                name="verify"
                value={data.verify}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section>
      <div className="imgBx">
        {signUp ? (
          <img src={SignUp} alt="logo" />
        ) : isForget ? (
          <img src={Forget} alt="logo" />
        ) : isReset ? (
          <img src={Logo} alt="logo" />
        ) : (
          <img src={Logo} alt="logo" />
        )}{" "}
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h1>WORKHUB</h1>
          <p>Discover new opportunities everyday</p>

          <form onSubmit={handleSubmit}>
            {!isForget &&
              (signUp ? (
                <div>
                  <select
                    className="selectForm"
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="">select your role</option>
                    <option value="User">User</option>
                    <option value="Expert">Expert</option>
                    <option value="Company">Company</option>
                  </select>

                  <div className="inputBx">
                    <span>FullName</span>
                    <input
                      required
                      placeholder="Enter Your Fullname"
                      type="text"
                      name="fullname"
                      value={data.fullname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              ))}
            <div className="inputBx">
              <span>Email</span>
              <input
                required
                placeholder="Enter your email "
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            {!isForget &&
              (signUp ? (
                <div>
                  <div className="inputBx">
                    <span>Password</span>
                    <input
                      required
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    <span>Comfirm Password</span>
                    <input
                      required
                      placeholder="Enter your Comfirm password"
                      type="password"
                      name="confirmpassword"
                      value={data.confirmpassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBx">
                    <span>َAdress</span>
                    <input
                      required
                      placeholder="Enter your adress"
                      type="text"
                      name="adress"
                      value={data.adress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="inputBx">
                    <span>City</span>
                    <input
                      required
                      placeholder="Enter your city"
                      type="text"
                      name="city"
                      value={data.city}
                      onChange={handleChange}
                    />
                  </div>

                  {elementsRole(data)}
                </div>
              ) : (
                <div className="inputBx">
                  <span>Password</span>
                  <input
                    required
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </div>
              ))}

            {isForget ? (
              <p></p>
            ) : (
              <div className="remember">
                <label>
                  <input required type="checkbox" name="checkremember" />
                  Remember me
                </label>
                <p
                  onClick={() => {
                    setIsForget((prev) => !prev);
                    resetForm();
                  }}
                >
                  Forget Password?
                </p>
              </div>
            )}
            <div className="inputBx">
              <button type="submit" className="button">
                {signUp ? "register" : isForget ? "resset now" : "login"}
              </button>
            </div>
            <div className="inputBx">
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => {
                  resetForm();
                  setSignUp((prev) => !prev);
                  setIsForget(false);
                }}
              >
                {signUp
                  ? "already have an account? Login"
                  : "Don't have an account? Sign up"}
              </p>
            </div>
          </form>
          <hr />

          <div className="google">
            <GoogleLogin
              clientId="271675632150-ssc2jgfdk1gv0gtkng5s3q4ukmb9c801.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

// <button > {signUp ? sign Up : Login}</button>

/*


login
register
forget password




<input />
<input />

<input />



<input />
<input />



*/
