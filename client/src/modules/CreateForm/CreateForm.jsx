import React from "react";
import PersonForm from "../../components/PersonForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const formData = {
    fname: "",
    lname: "",
    gender: "",
    email: "",
    phone_no: "",
    job_title: "",
  };
  const navigate = useNavigate();
  const jwt = `Bearer ${process.env.REACT_APP_JWT_TOKEN}`;

  const handleSubmit = async (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      const response = await axios.post(
        "http://localhost:4999/addcustomer",
        values,
        {
          headers: {
            authorization: jwt,
          },
        }
      );
      console.log("🚀 ~ handleSubmit ~ response:", response);
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <PersonForm
      formData={formData}
      isEdit={false}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateForm;
