yup = require("yup");
const loginValidator = yup.object().shape({
  email: yup.string().email("Please enter a valid email ").required("Required"),
  password: yup
    .string()
    .min(8, { length: "Password too short" })
    .matches(/\d+/, { message: { number: "Password no number" } })
    .matches(/[a-z]+/, { message: { lowercase: "Password no lowercase" } })
    .matches(/[A-Z]+/, { message: { uppercase: "Password no uppercase" } })
    .matches(/[!@#$%^&*()-+]+/, {
      message: { special: "Password no special char" },
    })
    .test(
      "Password has spaces",
      { spaces: "Password has spaces" },
      (value) => !/\s+/.test(value)
    )
    .required({ required: "password is required" }),
});
module.exports = { loginValidator };
