import React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, TextField, Grid, Typography, MenuItem } from "@mui/material";

const PersonForm = (props) => {
  const { formData, handleSubmit } = props;
  const [data, setData] = useState(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

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
          value={data[field.name]}
          onChange={handleChange}
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
          value={data[field.name]}
          onChange={handleChange}
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
            </Typography>{" "}
            {/* <Grid container spacing={2} ml={20}>
              <Grid item xs={10} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  value={data.fname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={data.lname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  margin="normal"
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  name="phone_no"
                  required
                  fullWidth
                  id="phone_no"
                  label="Phone No."
                  autoFocus
                  value={data.phone_no}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="job_title"
                  label="Job Title"
                  name="job_title"
                  value={data.job_title}
                  onChange={handleChange}
                />
              </Grid>
            </Grid> */}
            <Grid container spacing={2} ml={20}>
              {fields.map((field) => (
                <Grid key={field.name} item xs={12} sm={8}>
                  {renderField(field)}
                </Grid>
              ))}
            </Grid>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e, data)}
              variant="contained"
              sx={{ mt: 6, mb: 5 }}
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
