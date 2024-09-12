import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditEmployee = ({id, closeModal}) => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        dob: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(()=> {
          axios.get(`${import.meta.env.VITE_API_URL}/auth/category`)
          .then(result => {
            console.log(result)
              if(result.data.Status) {
                  setCategory(result.data.Result);
              } else {
                  alert(result.data.Error)
              }
          }).catch(err => console.log(err))
          console.log(id)
          axios.get(`${import.meta.env.VITE_API_URL}/auth/employee/${id}`)
          .then(result => {
            console.log(result)
              setEmployee({
                  ...employee,
                  name: result.data.Result[0].name,
                  email: result.data.Result[0].email,
                  dob: result.data.Result[0].dob,
                  address: result.data.Result[0].address,
                  salary: result.data.Result[0].salary,
                  category_id: result.data.Result[0].category_id,
                  image: result.data.Result[0].image,
              })
          }).catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('dob', employee.dob);
        formData.append('address', employee.address);
        formData.append('salary', employee.salary);
        formData.append('image', employee.image);
        formData.append('category_id', employee.category_id);
        axios.put(`${import.meta.env.VITE_API_URL}/auth/edit_employee/${id}`, formData)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
            closeModal('editEmployeeModal')
        }).catch(err => console.log(err))
    }
    
  return (
    <div>
      {
        employee.name === "" ? null : <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label for="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            value={employee.name}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        <div className="col-12">
            <label for="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="dob"
              placeholder="Select Date of Birth"
              autoComplete="off"
              value={employee.dob}
              onChange={(e) =>
                setEmployee({ ...employee, dob: e.target.value })
              }
            />
          </div>
        <div className='col-12'>
          <label for="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label for="category" className="form-label">
            Category
          </label>
          <select name="category" id="category" className="form-select"
              onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
            {category.map((c) => {
              return <option value={c.id.toString()}>{c.name}</option>;
            })}
          </select>
        </div>

        <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
        
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Edit Employee
          </button>
        </div>
      </form>
      }
    </div>
  )
}

export default EditEmployee