import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }
  return (
    <div style={{
      padding: '0px',
      margin: '0px',
      maxWidth: '100%',
      overflowX: 'hidden'
  }}>
      <div className="d-flex w-100 ">
        <div className=" px-sm-2 px-0 bg-dark" style={{position: 'relative', width: '200px'}}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">           
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 mt-4 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-3 align-middle text-center"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-3 align-middle text-white text-center"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-3 align-middle text-white text-center"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/analysis"
                  className="nav-link px-3 align-middle text-white text-center"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Analysis</span>
                </Link>
              </li>
              {/* <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li> */}
              <li className="w-100 mt-3" onClick={handleLogout}>
              <Link
                  className="nav-link px-3 align-middle text-white text-center"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow-1 p-0 m-0" style={{backgroundColor: '#F1F1F1'}}>
            <div >
              <div className="p-2 d-flex justify-content-center shadow">
                  <h4>Emoployee Management System</h4>
              </div>
              <Outlet />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
