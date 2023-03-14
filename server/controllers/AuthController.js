const User = require("../models/userModel.js");
const Company = require("../models/campanyModel.js");
const Expert = require("../models/expertModel.js");
const UserVerification = require("../models/UserVerification")
const router = require("express").Router();

const path= require("path")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require("../midleware/CreateToken");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const{v4 : uuidv4} =require("uuid")
require ("dotenv").config()



// const randomstring = require("randomstring");

//register + cryptage password
exports.register =
  ("/",
  async (req, res) => {
    const {
      fullname,
      email,
      password,
      role,
      activated,
      picture,
      gender,
      birthday,
      adress,
      university,
      open_work,
      open_stage,
      city,
      webSite,
      registerCommerce,
      certificate,
      experience,
      verified,
    } = req.body;

    const Email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    let exist = false;
    const iscampany = await Company.findOne({ email: Email });
    const isExpert = await Expert.findOne({ email: Email });
    const isUser = await User.findOne({ email: Email });
    if (isUser || isExpert || iscampany) {
      exist = true;
      res.status(400).json({ msg: "user already exist " });
    }
    if (req.body.role === "user") {
      if (!exist) {
        const actif = true;
        const user = await User.create({
          fullname,
          email,
          password: hashedPass,
          role,
          picture,
          gender,
          birthday,
          adress,
          university,
          open_work,
          open_stage,
          certificate,
          experience,
          activated: actif,
          verified:false,
        });
        
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.SECRET_TOKEN,
          { expiresIn: "200ms" }
        );
        user.save().then((result)=>{sendVerificationEmail(result,res)})
        res.status(201).send({ msg: "created sucess", user, token });
      }
    } else if (req.body.role === "campany") {
      if (!exist) {
        const user = await Company.create({
          fullname,
          email,
          password: hashedPass,
          role,
          picture,
          city,
          adress,
          webSite,
          registerCommerce,
          verified:false,
        });
        user.save().then((result)=>{sendVerificationEmail(result,res)})
        res
          .status(201)
          .send({ msg: "created sucess please wait the verification", user });
      }
    } else if (req.body.role === "expert") {
      if (!exist) {
        const user = await Expert.create({
          fullname,
          email,
          password: hashedPass,
          role,
          picture,
          gender,
          birthday,
          adress,
          certificate,
          experience,
          verified:false,
        });
        user.save().then((result)=>{sendVerificationEmail(result,res)})
        res
          .status(201)
          .send({ msg: "created sucess please wait the verification", user });
      }
    }
  });

  const sendVerificationEmail = ({_id,email},res)=>{
    const currentUrl="http://localhost:5000/"

    const uniqueString = uuidv4() + _id

    const mailOptions ={
      from: process.env.EMAIL,
      to : email,
      subject : "verify your email",
      html:`<p>Verifiy your email address to complete the signup and login into your accourt.</p><p>This link
       <b>expires in 6hours</b>.</p><p>Press <a href =${currentUrl + "auth/verify/" + _id + "/" + uniqueString}>here</
       a> to proceed.</p>`
    }

    const saltRounds=10
    bcrypt.hash(uniqueString, saltRounds).then((hashedUniqueString)=> {
      const newVerification = new UserVerification({
        userId : _id,
        uniqueString : hashedUniqueString,
        createdAt : Date.now(),
        expiresAt : Date.now() + 21600000
      })
      newVerification.save().then(()=>{
        transporter.sendMail(mailOptions).then(()=>{
          // res.json({
          //   status : "PENDING",
          //   message : "Verification email sent",
          // })
        }).catch((error)=>{
          console.log(error)
          res.json({
            status : "FAILED",
            message : "Verification email failed",
          })
        })
      }).catch((error)=>{
        console.log(error)
        res.json({
          status : "FAILED",
          message : "couldn't save verification email",
        })
      })
    }).catch(()=> {
      res.json({
        status : "FAILED",
        message : "An error occurred while hashing email data",
      })
    })
  }

  exports.verif =  async (req, res)=>{

   /* let {userId, uniqueString} = req.params

    users : [User] ;
    try{
      users = await User.findByIdAndUpdate(userId, {verified:true});
      res.status(200).json({message:"cbon"})
      console.log("test")
    }catch(error){
        res.status(400).json({message:error})
    }
    */


    let {userId, uniqueString} = req.params

    UserVerification.find({userId}).then((result)=>{
      if(result.length > 0){
        const {expiresAt} = result[0];
        const hashedUniqueString = result [0].uniqueString

        if (expiresAt < Date.now()){
          UserVerification.deleteOne({userId}).then((result)=>{
            User.deleteOne({_id : userId}).then(()=>{
              let message = "Link has expired try again"
              res.redirect(`/auth/verified/error=true&message=${message}`)
            }).catch((error)=>{
              let message = "clearing user with expired unique string failed"
              res.redirect(`/auth/verified/error=true&message=${message}`)
            })
          }).catch((error)=>{
            console.log(error)
            let message = "an error withle clearing expired user verification record"
            res.redirect(`/auth/verified/error=true&message=${message}`)
          })
        }else{
          bcrypt.compare(uniqueString, hashedUniqueString).then((result)=>{
            if(result){
              User.updateOne({_id : userId}, {verified : true}).then(()=>{
                UserVerification.deleteOne({userId}).then(()=>{
                  res.sendFile(path.join(__dirname,"../views/verified.html"))
                }).catch((error)=>{
                  console.log(error)
                  let message = "an error withlefinalizing successful verification email"
                  res.redirect(`/auth/verified/error=true&message=${message}`)
                })
              }).catch((error)=>{
                console.log(error)
                let message = "an error coccured while updating user record to show verified"
                res.redirect(`/auth/verified/error=true&message=${message}`)
              })
            }else{
              let message = "invalid verification detailspassed , check your inbox"
              res.redirect(`/auth/verified/error=true&message=${message}`)
            }
          }).catch((error)=>{
            let message = "an error withle comparing unique srings"
            res.redirect(`/auth/verified/error=true&message=${message}`)
          })     
        }
      }else{
        let message = "account record dosent exist or has been verified already Pleaze signup or login "
        res.redirect(`/auth/verified/error=true&message=${message}`)
      }
    }).catch((error)=>{
      console.log(error)
      let message = "an error withle checking verification email"
      res.redirect(`/auth/verified/error=true&message=${message}`)
    })
  }
exports.verified =  (req,res)=>{
  res.sendFile(path.join(__dirname, "../views/verified.html"))
}
//Login
exports.signin =
  ("/",
  async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });


    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }
    if (user.role == "user") {

      if(!user.verified){
        res.json({
          status:"FAILED",
          message:"Emil hasn't been verifiedyet . check inbox"
        })
      }else{
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        // checking if password was valid and send response accordingly
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        //signing token with user id
        var token = jwt.sign(
          {
            id: user.id,
          },
          process.env.SECRET_TOKEN,
          {
            expiresIn: 86400,
          }
        );
  
        //responding to client request with user profile success message and  access token .
        res.status(200).send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
          },
          message: "Login successfull for user",
          accessToken: token,
        });
      }
      //comparing passwords
      
    } else if (user.role === "campany" || user.role === "expert") {
      if (!user.activated) {

        if(!user.verified){
          res.json({
            status:"FAILED",
            message:"Emil hasn't been verifiedyet . check inbox"
          })
        }else{
          var token = jwt.sign(
            {
              id: user.id,
            },
            process.env.SECRET_TOKEN,
            {
              expiresIn: 86400,
            }
          );

          return res.status(200).send({
            user: {
              id: user._id,
              email: user.email,
              fullName: user.fullName,
            },
            message: "Login successfull for company",
            accessToken: token,
          });
        }

        //signing token with user id

        
      } else {
        return res.status(200).send({ msg: "please wait your activation" });
      }
    } else {
      res.status(403).send({ msg: "err server" });
    }
  });

exports.sendEmails = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = new Promise((resolve, reject) => {
    oAuth2Client.getAccessToken((err, accessToken) => {
      if (err) reject(err);
      resolve(accessToken);
    });
  });

  // email config
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "forgetting password",
      text: "message from email",
      html: "<h1>message from last test in coffée</h1>",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return res.status(200).json(info);
  } catch (error) {
    console.error("Error sending email: " + error);
    return res.status(400).json(error);
  }
};

//Forgot Password

// forget passwords and sending mail

exports.sendEmails = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = new Promise((resolve, reject) => {
    oAuth2Client.getAccessToken((err, accessToken) => {
      if (err) reject(err);
      resolve(accessToken);
    });
  });
  

  // email config
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "TLINK well be deployed soon",
      text: "message from email",
      html: "<h1>hello every One guess how's back</h1>",
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json(info);
  } catch (error) {
    return res.status(400).json(error);
  }
};
sendLinkReset = async (to, url, text, name) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = new Promise((resolve, reject) => {
    oAuth2Client.getAccessToken((err, accessToken) => {
      if (err) reject(err);
      resolve(accessToken);
    });
  });

  // email config
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: "Reset Password",
      text: text,
      html: `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>Passioncorners | Account Activation</title>
        <style>
          body {
            background-color: #333333;
            height: 100vh;
            font-family: "Roboto", sans-serif;
            color: #fff;
            position: relative;
            text-align: center;
          }
          .container {
            max-width: 700px;
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }
          .wrapper {
            padding: 0 15px;
          }
          .card {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
          span {
            color: #ffc107;
          }
          button {
            padding: 1em 6em;
            border-radius: 5px;
            border: 0;
            background-color: hsl(45, 100%, 51%);
            transition: all 0.3s ease-in;
            cursor: pointer;
          }
          button:hover {
            background-color: hsl(45, 70%, 51%);
            transition: all 0.3s ease-in;
          }
          .spacing {
            margin-top: 5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="wrapper">
            <div class="card">
              <h1><span>Hey</span> ${name}</h1>
              <p>Please click the button below to reset your password. 🙂</p>
              <a href=${url}><button>${text}</button></a>
              <p class="spacing">
                If the button above does not work, please navigate to the link
                provided below 👇🏻
              </p>
              <div>${url}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json(info);
  } catch (error) {
    console.error("Error sending email: " + error);
    res.status(400).json(error);
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    // get email
    const { email } = req.body;

    // check email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "This email is not registered in our system." });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.CLIENT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({ user, token });
    // create ac token
    const ac_token = createToken.access({ id: user._id });

    // send email
    const url = `http://localhost:5000/auth/forget-password/${user._id}/${ac_token}`;
    const name = user.fullname;
    const sended = await sendLinkReset(email, url, "Reset your password", name);

    // success
    return res
      .status(200)
      .json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.deletet = async  (req,res,next)=>{
  try{
      await User.findByIdAndRemove(req.params.id)
      res.send("delete")
  }catch(err){
      res.send(err)
  }
 }

exports.ResetPassword = async (req, res) => {
  try {
    // get password
    const id = req.params.id;
    const { password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    // update password
    const updated = await User.findOneAndUpdate(
      { _id: id },
      { password: hashPassword }
    );

    // reset success
    res.status(200).json({ msg: "Password was updated successfully!!!." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


let transporter = nodemailer.createTransport({
  service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
})

transporter.verify((error,success)=>{
  if(error){
    console.log(error)
  }else{
    console.log("ready for messages");
    console.log(success)
  }
})
