import React from "react";
import PersonForm from "../../components/PersonForm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state.formData;
  const jwt = `Bearer ${process.env.REACT_APP_JWT_TOKEN}`;

  const handleSubmit = async (values) => {
    try {
      await axios.put(
        `http://localhost:4999/updaterecord/${formData._id}`,
        values,
        {
          headers: {
            authorization: jwt,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <PersonForm formData={formData} isEdit={true} handleSubmit={handleSubmit} />
  );
};

export default EditForm;
