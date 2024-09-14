import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import EmployeeCharts from "./Analysis";
import Loading from "./Loading";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [newAdded, setNewAdded] = useState(false);

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          axios.get(`${import.meta.env.VITE_API_URL}/auth/category`)
          .then(categoryResult => {
              if(categoryResult.data.Status) {
                  setCategory(categoryResult.data.Result);
              } else {
                  alert(categoryResult.data.Error)
              }
              setLoading(false)
          }).catch(err => setLoading(false))
        } else {
          alert(result.data.Error);
          setLoading(false)
        }
      })
      .catch((err) => setLoading(false));

      // axios.get(`${import.meta.env.VITE_API_URL}/auth/category`)
      // .then(result => {
      //     if(result.data.Status) {
      //         setCategory(result.data.Result);
      //     } else {
      //         alert(result.data.Error)
      //     }
      //     setLoading(false)
      // }).catch(err => console.log(err))
  }, [newAdded]);
  

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/auth/delete_employee/${id}`)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 

  // Function to close the modal programmatically
const closeModal = (modalId) => {
  const modalElement = document.getElementById(modalId);
  const modalInstance = bootstrap.Modal.getInstance(modalElement); // Get the modal instance
  modalInstance.hide(); // Hide the modal
  setNewAdded((prevState)=>!prevState)
};

const [toEditID, setToEditID] = useState(null)

useEffect(()=>{
  setToEditID(null);
}, [ ])

const openEditModal = () => {
  if(toEditID !== null) {
    const modalElement = document.getElementById('editEmployeeModal');
    const modalInstance = new bootstrap.Modal(modalElement); // Create a new modal instance
    modalInstance.show(); // Show the modal
    modalElement.addEventListener('hidden.bs.modal', function (event) {
      setToEditID(null);
    });
  }
};



useEffect(()=>{
  openEditModal();
}, [toEditID])

const [categorySearch, setCategorySearch] = useState(null)
const [nameSearch, seNameSearch] = useState(" ")




  return (
    <div className=" mt-3" style={{padding:"0px 3%"}}>
        {
          loading && <Loading/>
        }
      

      <div className="container my-4 p-4 shadow-sm" style={{backgroundColor: '#222222'}}>
        <form id="employeeSearchForm" className="row g-2">
          
          <div className="col-md-6">
            <label for="employeeName" className="form-label  text-white">Search by Name</label>
            <input type="text" className="form-control" id="employeeName" placeholder="Enter employee name" onChange={(e)=>seNameSearch(e.target.value.trim())}/>
          </div>

          <div className="col-md-6">
            <label for="category" className="form-label text-white">
              Category
            </label>
            <select name="category" id="category" className="form-select w-100"
                onChange={(e) => setCategorySearch(e.target.value.trim())}>
              <option value={null}> </option>
              {category.map((c) => {
                return <option value={c.name}>{c.name}</option>;
              })}
              <option value="Unknown">Unknown</option>
            </select>
          </div>
        </form>
      </div>


      <button 
        type="button" 
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg d-flex align-items-center justify-content-center" 
        data-bs-toggle="modal" 
        data-bs-target="#addEmployeeModal"
        style={{width: "50px", height: "50px", zIndex: 50}}>
        <i className="bi bi-plus fs-3"></i>
      </button>

      <div className="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEmployeeModalLabel">Add New Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <AddEmployee closeModal={closeModal}/>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="row">
        {employee[0] ? employee.map((e) => {
            if(nameSearch == " " || e.name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1) {
              console.log(categorySearch == " ")
              if(!categorySearch || e.category_name === categorySearch) {
                return <div className="col-12 col-sm-6 col-md-4 col-lg-4 py-2 px-1 employeeCard">
                    <div className="position-relative shadow-lg bg-white">
                      <div className="position-relative">
                        <img
                          src={e.image}
                          className="img-fluid rounded"
                          alt="Employee"
                          style={{ height: '150px', width: '100%', objectFit: 'cover', inset: 1 }}
                        />
                      </div>
                      <a href={`mailto:${e.email}`} className=" position-absolute top-0 end-0 bg-white p-2"><i className="fs-4 bi-envelope me-1"></i>
                        </a>
                      <div className="mt-2 p-3">
                        <h2 style={{margin: 0, fontSize:'20px'}}>{e.name}</h2>
                        
                        <p className="my-1"><b>Department:</b> {e.category_name}</p>
                        <p className="mb-1"><i className="bi bi-geo-alt"></i> {e.address}</p>
                        <p className="mb-2" style={{width:"fit-content", marginLeft: "auto", color: "#013220"}}>&#8358;{e.salary}</p>
                        <button
                          className="btn btn-sm me-2"
                          style={{border:'1px solid #222222'}}
                          onClick={()=>{
                            setToEditID(e.id)
                          }}
                        >
                          <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        </button>
                        
                        <button
                          className="btn btn-sm"
                          style={{border:'1px solid #8B0000', color: '#8B0000'}}
                          onClick={() => handleDelete(e.id)}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                      
                      
                    </div>
                  </div>
              }
            }
          }) : <h2>No Result for your search</h2>
        }
        </div>
        
        {
          toEditID !== null && <div className="modal fade" id="editEmployeeModal" tabindex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editEmployeeModalLabel">Edit Employee</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <EditEmployee closeModal={closeModal} id={toEditID}/>
                </div>
              </div>
            </div>
          </div> 
        }
        
      </div>

      
    </div>
  );
};

export default Employee;
