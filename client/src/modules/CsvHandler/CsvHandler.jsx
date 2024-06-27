import React from "react";
import { Box, Button, Grid, Input, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CsvHandler = () => {
  const navigate = useNavigate();
  const jwt = `Bearer ${process.env.REACT_APP_JWT_TOKEN}`;

  const validationSchema = Yup.object().shape({
    csvFile: Yup.mixed().required("A CSV file is required"),
  });

  const formik = useFormik({
    initialValues: {
      csvFile: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("csvFile", values.csvFile);
        const response = await axios.post(
          "http://localhost:4999/create",
          formData,
          {
            headers: {
              authorization: jwt,
            },
          }
        );
        if (response.status === 201) {
          navigate("/");
        }
      } catch (error) {
        console.log("🚀 ~ uploadCsv ~ error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("csvFile", file);
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
              Upload CSV here
            </Typography>
            <Grid container spacing={2} ml={30}>
              <Grid item xs={12} sm={8} sx={{ mt: 6, mb: 5 }}>
                <Input
                  type="file"
                  name="csvFile"
                  id="csvFile"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.csvFile && Boolean(formik.errors.csvFile)
                  }
                  inputProps={{ "data-testid": "csvFileInput" }}
                />
                {formik.touched.csvFile && formik.errors.csvFile && (
                  <Typography color="error" variant="body2">
                    {formik.errors.csvFile}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={8} ml={15}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 6, mb: 5 }}
                  startIcon={<CloudUploadIcon />}
                  disabled={formik.isSubmitting}
                >
                  Upload file
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default CsvHandler;
