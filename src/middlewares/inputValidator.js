import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z ]+$")).min(3).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.pattern.base": "Name must only contain letters and spaces",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must not exceed 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(30).pattern(new RegExp("(?=.*[!@#$%^&*])")).required().invalid(Joi.ref("email")).messages({
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password must not exceed 30 characters",
    "string.pattern.base": "Password must contain at least one special character !@#$%^&*",
    "any.invalid": "Password cannot be the same as email",
    "any.required": "Password is required",
  }),
});

// Middleware for validating signup input data
const inputValidator = (req, res, next) => {
  const {error} = userSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    // Render signup form with error message
    return res.render("signup.ejs", {error: errorMessage});
  }
  next();
};

export default inputValidator;
