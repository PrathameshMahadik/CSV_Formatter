import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const fields = [
  { key: "fname", label: "First Name" },
  { key: "lname", label: "Last Name" },
  { key: "gender", label: "Gender" },
  { key: "email", label: "Email" },
  { key: "phone_no", label: "Phone Number" },
  { key: "job_title", label: "Job Title" },
];

const Profile = () => {
  const location = useLocation();
  const formData = location.state.formData;
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            Customer Information
          </Typography>
        </Grid>
        <Grid container spacing={3} ml={3}>
          {fields.map(({ key, label }) => (
            <Grid item xs={12} sm={9} ml={12} key={key}>
              <Typography variant="h6">
                {label}: {formData[key]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
