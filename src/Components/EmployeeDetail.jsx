import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/employee/detail/${id}`)
        .then(result => {
            console.log(result)
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/employee/logout`)
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
        </div>
        <div className='emp_det'>
            <div>
                <div className='d-flex justify-content-center align-items-center mt-3 emp_det_card'>
                    <img src={employee.image} className='emp_det_image'/>
                    <div style={{marginLeft:"10px"}}>
                        <h3>Name: {employee.name}</h3>
                        <h3>Email: {employee.email}</h3>
                        <h3>Department: {employee.category_name}</h3>
                        <h3>Salary: ${employee.salary}</h3>
                    </div>
                </div>
                <button className='btn btn-danger w-100' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail