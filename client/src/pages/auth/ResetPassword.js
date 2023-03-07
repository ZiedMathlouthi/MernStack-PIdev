import Logo from "../../img/affichage.jpg";
import "./Login.css";
import reset from "../../img/reset.png"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {

  const [message,setMessage] = useState("")
  const [password,setPassword]  = useState('')

  const history = useNavigate('')
  const {id,token} = useParams()
  const uservalid = async()=>{
      const res = await fetch(`/forget-password/${id}/${token}`,{
      method: "GET",
      headers:{
          "Content-Type" : "application/json"
      }
  });

  const data = await res.json()
  if(data.status==201){
      console.log('user valid')
  }else{
      history("*")
  }
  }

  const setval =(e)=>{
  setPassword(e.target.value)}

  const sendPassword =async(e)=>{
      const res = await fetch(`/${id}/${token}`,{
          method: "POST",
          headers:{
              "Content-Type" : "application/json"
          },
          body : JSON.stringify({password})
      });
      const data = await res.json()
      if(data.status==201){
          setPassword("")
          setMessage(true)
      }else{
          console.log("token expired")
      }   
  }
  useEffect(()=>{
      uservalid()
  },[])

    return ( <>
     <section>
      <div className="imgBx">
        <img src={Logo} alt="logo" />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <form>
            <br></br>
          <img src={reset} alt="logo" />
          { message ? <p style={{color:"green", fontWeight:"bold"}}> password Succesfully update</p> : ""}
            
          <div className="inputBx">
              <span>New Password</span>
              <input
                required
                placeholder="Enter your new password"
                type="password"
                name="password"
                value ={password}
                  onChange={setval}
              />
              <button className="btn" >Send</button>
            </div>
           
          </form>
          
        </div>
      </div>
    </section>
    </> );
}

export default ResetPassword;