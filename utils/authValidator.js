import * as Yup from "yup";

// Common schemas
const emailSchema = Yup.string()
  .email("Invalid email address")
  .required("Email is required");
const passwordSchema = Yup.string()
  .min(5, "Password must be at least 5 characters")
  .required("Password is required");

//Registration schema
const registrationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: emailSchema,
  password: passwordSchema,
});

//Login Schema
const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

//Validation function
const authValidator = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return null;
  } catch (err) {
    const errors = err.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
    return errors;
  }
};

export { registrationSchema, loginSchema, authValidator };
