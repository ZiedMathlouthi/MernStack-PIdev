yup = require("yup");

const userValidator = yup.object().shape({
  fullname: yup.string().min(4).required("Required").max(255),
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

  adress: yup.string().min(4).required("Required"),
  city: yup.string().min(3).required("Required"),
  competence: yup.string().min(4).required("Required"),
  birthday: yup
    .date()
    .max(new Date(Date.now() - 567648000000), "You must be valid")
    .required("Required"),
  gender: yup.string().required().max(255).oneOf(["male", "female"]),
});

module.exports = { userValidator };
