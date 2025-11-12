import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// Middleware for validating input data
const inputValidator = (req, res, next) => {
  const {error} = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

export default inputValidator;
