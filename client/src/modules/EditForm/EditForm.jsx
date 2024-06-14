import React, { useState } from 'react'
import PersonForm from '../../components/PersonForm'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const formData = location.state.formData ;

  const handleSubmit = async(e,data)=>{
    e.preventDefault()
    try{
      const response = await axios.put(`http://localhost:4999/updaterecord/${data._id}`,{
        data
      })
      console.log("🚀 ~ handleSubmit ~ response:", response)
      navigate("/")
    }catch(error){
      console.log("🚀 ~ handleSubmit ~ error:", error)
      
    }
  }
  return (
    <PersonForm formData={formData} isEdit={true} handleSubmit={handleSubmit}/>
  )
}

export default EditForm
