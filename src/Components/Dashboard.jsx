import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      })
      .catch(err => console.error(err));
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };


  useEffect(()=>{
    console.log(window.innerWidth)
    const sideMenuBar = document.getElementById('sideMenu');
    if(window.innerWidth < 768) {
      if(isSidebarVisible) {
        sideMenuBar.style.left = 0;
      } else {
        sideMenuBar.style.left = '-100vw';
      }
    }
  }, [isSidebarVisible])

  return (
    <div style={{
      padding: '0px',
      margin: '0px',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <div className="d-flex w-100">
        {/* Sidebar */}
        <div
          className={`px-0 sideMenu close`} id="sideMenu" onClick={(e) => e.target.classList.contains('close') && closeSidebar()}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100" style={{width: '260px', backgroundColor: '#222222', borderRight: '2px solid #FFFFF0'}}>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 mt-4 align-items-center align-items-sm-start" id="menu">
              <li className="w-100 text-center mb-5">
                <Link to="/" className="nav-link text-white px-3 align-middle close">
                  <i class="fa fa-tasks fs-4 close" aria-hidden="true"></i>
                  <span className="ms-2 d-inline close">EMS</span>
                </Link>
                <hr/>
              </li>
              <li className="w-100">
                <Link to="/dashboard" className="nav-link text-white px-3 align-middle close">
                  <i className="fs-4 bi-speedometer2 ms-2 close"></i>
                  <span className="ms-2 d-inline close">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/employee" className="nav-link px-3 align-middle text-white close">
                  <i className="fs-4 bi-people ms-2 close"></i>
                  <span className="ms-2 d-inline close">Manage Employees</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/category" className="nav-link px-3 align-middle text-white close">
                  <i className="fs-4 bi-columns ms-2 close"></i>
                  <span className="ms-2 d-inline close">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/analysis" className="nav-link px-3 align-middle text-white close">
                  <i className="fs-4 bi-graph-up ms-2 close"></i>
                  <span className="ms-2 d-inline close">Analysis</span>
                </Link>
              </li>
              <li className="w-100 mt-3" onClick={handleLogout}>
                <Link className="nav-link px-3 align-middle text-white close">
                  <i className="fs-4 bi-power ms-2 close"></i>
                  <span className="ms-2 d-inline close">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div
          className={`px-0 ${isSidebarVisible ? 'contentSide' : 'contentSide'}`}
          style={{
            backgroundColor: '#FFFFF0',
            transition: 'margin-left 0.3s ease'
          }}
        >
          <div>
            {/* Navbar */}
            <div className="d-md-none bg-white shadow w-100 d-flex justify-content-between p-2 align-items-center">
              <Link to="/" className="fs-2 m-0" style={{color: "#222", textDecoration: 'none'}}><i class="fa fa-tasks" aria-hidden="true"></i>EMS</Link>
              <button className="btn p-2 fs-2" style={{color: "#222"}} onClick={toggleSidebar}>
                <i className="bi bi-list"></i>
              </button>
            </div>
            <div className="d-none d-md-flex p-2 justify-content-center py-4 shadow" style={{backgroundColor: "#222222", position:'relative'}}>
              <div className="text-white text-center">
                <h4 style={{fontSize: '50px'}}><i class="fa fa-tasks" aria-hidden="true"></i>EMS</h4>
                <p className="lead">Empowering Teams, Simplifying Management.</p>
              </div>
            </div>
            {/* Outlet for rendering content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
