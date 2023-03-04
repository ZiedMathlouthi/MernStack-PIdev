import React, { useState, useEffect } from "react";
import Logo from "../../img/login.png";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    role: "user",
    fullname: "",
    email: "",
    password: "",
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
  useEffect(() => {
    if (data.role === "expert") {
      setIsExpert((prev) => !prev);
      setIsExpert((prev) => !prev);
    } else if (data.role === "company") {
      setIsCompany((prev) => !prev);
    }
  }, []);

  const [signUp, setSignUp] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [isCompany, setIsCompany] = useState(true);
  const [data, setData] = useState(initialState);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <section>
      <div className="imgBx">
        <img src={Logo} alt="logo" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h1>WORKHUB</h1>
          <p>Discover new opportunities everyday</p>

          <form>
            {signUp && (
              <select
                className="selectForm"
                name="role"
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Expert">Expert</option>
                <option value="Company">Company</option>
              </select>
            )}
            {signUp && (
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
            )}
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
            {signUp && (
              <div className="inputBx">
                <span>َAdress</span>
                <input
                  required
                  placeholder="Enter your adress"
                  type="password"
                  name="adress"
                  value={data.adress}
                  onChange={handleChange}
                />
              </div>
            )}
            {signUp && (
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
            )}

            {isExpert && (
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
                    name="comptence"
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
            )}

            {isCompany && (
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
            )}

            <div className="remember">
              <label>
                <input required type="checkbox" name="checkremember" />
                Remember me
              </label>
              <p>
                <Link to="/forget-password">Forget Password?</Link>
              </p>
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign in" name="" />
            </div>
            <div className="inputBx">
              <p
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setSignUp((prev) => !prev)}
              >
                Don't have an account? <span>Sign up</span>
              </p>
            </div>
          </form>
          <hr />
          <button type="submit" className="GoogleBtn">
            <FcGoogle /> &nbsp; Login with google
          </button>
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
