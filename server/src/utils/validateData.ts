const Joi = require('joi');

const schema = Joi.object({
  Index: Joi.string().required(),
  'First Name': Joi.string().required(),
  'Last Name': Joi.string().required(),
  Gender: Joi.string().required(),
  Email: Joi.string().email().required(),
  Phone: Joi.string().required(),
  'Job Title': Joi.string().required(),
});

const validateData = (data:any[]) => {
  const results: any = [];
  data.forEach((item, index) => {
    const { error, value } = schema.validate(item, { abortEarly: false });
    if (error) {
      results.push({ row: index + 1, error: error.details.map((err:any) => err.message) });
    }
  });
  return results;
};

const jsonArray = [
  {
    "First Name": "John",
    "Last Name": "Doe",
    "Gender": "Male",
    "Email": "john.doe@example.com",
    "Phone": "1234567890",
    "Job Title": "Engineer",
  },
  {
    "First Name": "Jane",
    "Last Name": "Smith",
    "Gender": "Female",
    "Email": "jane.smith@example.com",
    "Phone": "9876543210",
  }
];

const validationResults = validateData(jsonArray);

if (validationResults.length > 0) {
  console.log('Validation errors:');
  console.log(validationResults);
} else {
  console.log('All data is valid.');
}
