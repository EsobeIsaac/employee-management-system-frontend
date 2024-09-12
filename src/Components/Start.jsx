import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect

const Start = () => {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/verify`)
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard')
        } else {
          navigate('/employee_detail/'+result.data.id)
        }
      }
    }).catch(err =>console.log(err))
  }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="rounded border loginForm mx-auto" style={{maxWidth: '600px'}}>
        <h2 className="text-center mx-2 mt-3 fs-1">Login As</h2>
        <p className="fs-4 text-center mx-2">Select a prefered option to login</p>
        <div className="d-flex mt-5 mb-0">
          <button style={{borderRadius: 0}} type="button" className="btn btn-primary w-50" onClick={() => {navigate('/employee_login')}}>
            Employee
          </button>
          <button style={{borderRadius: 0}} type="button" className="btn btn-secondary w-50" onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
