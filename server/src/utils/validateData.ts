const Joi = require("joi");

const schema = Joi.object({
  Index: Joi.string().required(),
  "First Name": Joi.string().required(),
  "Last Name": Joi.string().required(),
  Gender: Joi.string().required(),
  Email: Joi.string().email().required(),
  Phone: Joi.string().required(),
  "Job Title": Joi.string().required(),
});
