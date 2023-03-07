//used to validate user input
yup = require("yup");

const registerValidator = yup.object().shape({
  fullname: yup.string().min(4).required("Required").max(255),
  email: yup.string().email("Please enter a valid email ").required("Required"),
  password: yup.string().required("Required").max(1024).min(6),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "please password must match")
    .required("Required"),
  adress: yup.string().min(4),
  city: yup.string().min(3),
  competence: yup.string().min(4),
  experience: yup.string().min(4),
  birthday: yup
    .date()
    .max(new Date(Date.now() - 567648000000), "You must be valid")
    .required("Required"),
  gender: yup.string().required().max(255).oneOf(["male", "female"]),
  website: yup.string().matches(URL, "Enter a valid url"),
});

const loginValidator = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required()
    .max(1024, "Password must be at most 1024 characters long.")
    .min(6, "Password must be at least 6 characters long."),
});

module.exports = { registerValidator, loginValidator };
