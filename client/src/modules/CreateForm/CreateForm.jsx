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
  const navigate=useNavigate()
  const handleSubmit = async (e,data) => {
    e.preventDefault();
    console.log("🚀 ~ handleSubmit ~ data:", data)
    try {
      const response = await axios.post("http://localhost:4999/addcustomer", {
        data,
      });
      console.log("🚀 ~ handleSubmit ~ response:", response)
      navigate("/")
    } catch (error) {}
  };
  return (
    <PersonForm formData={formData} isEdit={false} handleSubmit={handleSubmit} />
  );
};

export default CreateForm;
