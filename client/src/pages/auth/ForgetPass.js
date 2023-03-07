import React, { useState, useEffect } from "react";
import Logo from "../../img/affichage.jpg";
import "./Login.css";
import reset from "../../img/reset.png"
const ForgetPass = () => {
 
 const [email,setEmail] = useState("")
 const [message,setMessage] = useState("")

const setVal = (e) =>{
    setEmail(e.target.value)
}
const SendLink = async(e)=>{
e.preventDefault();

const res = await fetch("/sendMail", {
    method : "POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({email})
})

const data = await res.json()
if (data.status == 201){
    setEmail("")
    setMessage(true)
}else{
    console.log('invalid user')
}
}

  
  return (
    <section>
      <div className="imgBx">
        <img src={Logo} alt="logo" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <form>
            <br></br>
          <img src={reset} alt="logo" />
          { message ? <p style={{color:"green", fontWeight:"bold"}}> password reset link send Succesfully in Your Email</p> : ""}
            <div className="inputBx">
            <span>Email</span>
              <input
                required
                placeholder="Email address "
                type="text"
                name="email"
                value={email}
                onChange={setVal}
              />
              <button className="btn" onClick={SendLink}>Send Reset Email</button>
            </div>
           
          </form>
          
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;

