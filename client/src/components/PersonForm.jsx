import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, TextField, Grid, Typography, MenuItem } from "@mui/material";

const fields = [
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "fname", label: "First Name", required: true },
  { name: "lname", label: "Last Name", required: true },
  {
    name: "gender",
    label: "Gender",
    required: true,
    select: true,
    options: ["Male", "Female", "Other"],
  },
  { name: "phone_no", label: "Phone No.", required: true },
  { name: "job_title", label: "Job Title", required: true },
];

const validationSchema = Yup.object(
  fields.reduce((schema, field) => {
    if (field.required) {
      schema[field.name] = Yup.string().required(`${field.label} is required`);
      if (field.type === "email") {
        schema[field.name] = schema[field.name].email("Invalid email address");
      }
    }
    return schema;
  }, {})
);

const PersonForm = (props) => {
  console.log("🚀 ~ PersonForm ~ props:", props)
  const { formData, handleSubmit } = props;

  const formik = useFormik({
    initialValues: fields.reduce((values, field) => {
      values[field.name] = formData[field.name] || "";
      return values;
    }, {}),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const renderField = (field) => {
    if (field.select) {
      return (
        <TextField
          key={field.name}
          select
          label={field.label}
          fullWidth
          margin="normal"
          name={field.name}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched[field.name] && Boolean(formik.errors[field.name])
          }
          helperText={formik.touched[field.name] && formik.errors[field.name]}
        >
          {field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );
    } else {
      return (
        <TextField
          key={field.name}
          required={field.required}
          fullWidth
          id={field.name}
          label={field.label}
          name={field.name}
          type={field.type || "text"}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched[field.name] && Boolean(formik.errors[field.name])
          }
          helperText={formik.touched[field.name] && formik.errors[field.name]}
        />
      );
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Grid item xs={8} sm={6} md={20} component={Paper} elevation={4} square>
        <Box
          sx={{
            my: 2,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Enter data
            </Typography>
            <Grid container spacing={2} ml={20}>
              {fields.map((field) => (
                <Grid key={field.name} item xs={12} sm={8}>
                  {renderField(field)}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 6, mb: 5 }}
              aria-label="Send Data"
              test-id = "submitData"
            >
              Send Data
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default PersonForm;
