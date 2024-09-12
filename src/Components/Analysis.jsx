import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';
import axios from 'axios';
import Loading from "./Loading";

// Register Chart.js components
Chart.register(...registerables);

const EmployeeCharts = () => {

    const [employees, setEmployees] = useState([]);
    const [category, setCategory] = useState([]);
    const [categorySearch, setCategorySearch] = useState(null);

    const [loading, setLoading] = useState(false)

    const getEmployees = () => {
      setLoading(true)
      axios
      .get(`${import.meta.env.VITE_API_URL}/auth/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
          axios.get(`${import.meta.env.VITE_API_URL}/auth/category`)
            .then(result => {
                if(result.data.Status) {
                    setCategory(result.data.Result);
                    setLoading(false)
                } else {
                    alert(result.data.Error);
                    setLoading(false)
                }
            }).catch(err => setLoading(false));
        } else {
          alert(result.data.Error);
          setLoading(false)
        }
      })
        .catch((err) => setLoading(false));
    }
  
    useEffect(() => {
        getEmployees();        
    }, []);

    function destroyChart(chartId) {
        const chart = Chart.getChart(chartId); // Get the chart instance
        if (chart) {
            chart.destroy(); // Destroy the existing chart
        }
    }

    useEffect(() => {
        if (employees[0]) {
            let employees_new;

            if (categorySearch) {
                employees_new = employees.filter(item => item.category_name === categorySearch);
            } else {
                employees_new = employees;
            }

            // Extract salaries and categories from the data
            const employeeSalaries = employees_new.map(employee => employee.salary);
            const employeeCategories = employees_new.map(employee => employee.category_name);

            // Count occurrences of each category
            const categoryCounts = employeeCategories.reduce((acc, category) => {
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            // Salary Distribution Pie Chart
            destroyChart('salaryDistributionChart');
            const ctx1 = document.getElementById('salaryDistributionChart').getContext('2d');
            new Chart(ctx1, {
                type: 'pie',
                data: {
                    labels: categorySearch ? employees_new.map(employee => `${employee.name} (₦${employee.salary}`) : Object.keys(categoryCounts),
                    datasets: [{
                        label: 'Employee Salaries',
                        data: categorySearch ? employeeSalaries : Object.values(categoryCounts),
                        backgroundColor: categorySearch ? ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'] : ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: categorySearch ? 'Employee Salaries in Selected Category' : 'Size of Departments'
                        }
                    }
                }
            });

            // Employee Categories Pie Chart
            // destroyChart('employeeCategoryChart');
            // const ctx2 = document.getElementById('employeeCategoryChart').getContext('2d');
            // new Chart(ctx2, {
            //     type: 'pie',
            //     data: {
            //         labels: Object.keys(categoryCounts),
            //         datasets: [{
            //             label: 'Number of Employees per Category',
            //             data: Object.values(categoryCounts),
            //             backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            //             hoverOffset: 4
            //         }]
            //     },
            //     options: {
            //         plugins: {
            //             title: {
            //                 display: true,
            //                 text: 'Employee Categories Distribution'
            //             }
            //         }
            //     }
            // });

            // Destroy and create age distribution chart
            destroyChart('ageDistributionChart');
            const ctx3 = document.getElementById('ageDistributionChart').getContext('2d');
            // ctx3.canva.height = 300;
            const employeeDOBs = employees_new.map(employee => new Date(employee.dob));
            const ageGroups = [20, 30, 40, 50, 60, 70];
            const ageDistribution = ageGroups.reduce((acc, age) => {
                acc[age] = 0;
                return acc;
            }, {});

            employeeDOBs.forEach(dob => {
                const age = calculateAge(dob);
                const ageBracket = ageGroups.find(group => age < group) || '70+';
                ageDistribution[ageBracket] = (ageDistribution[ageBracket] || 0) + 1;
            });
            new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: Object.keys(ageDistribution),
                    datasets: [{
                        label: 'Number of Employees by Age Group',
                        data: Object.values(ageDistribution),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Age Distribution of Employees'
                        }
                    }
                }
            });
        }
    }, [employees, categorySearch]);

    function calculateAge(dob) {
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

    return (
        <>

            {
              loading && <Loading/>
            }
            {
                employees[0] ? (
                    <div className='px-2 w-100 py-5'>
                        <div className="" style={{ maxWidth: '600px', width: '100%', maxHeight: '200px' }}>
                            <label htmlFor="category" className="form-label">
                                Category:
                            </label>
                            <select name="category" id="category" className="form-select"
                                onChange={(e) => setCategorySearch(e.target.value.trim())}>
                                <option value={null}> </option>
                                {category.map((c) => {
                                    return <option key={c.name} value={c.name}>{c.name}</option>;
                                })}
                                <option value="Unknown">Unknown</option>
                            </select>
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-md-6' style={{ marginTop: '60px' }}>
                                <canvas id="salaryDistributionChart" width="200" height="200" style={{boxShadow: "0px 0px 2px 2px #ccc", backgroundColor: '#fff'}}></canvas>
                            </div>
                            <div className='col-md-6' style={{ marginTop: '60px' }}>
                                <canvas id="ageDistributionChart" width="200" height="200" style={{boxShadow: "0px 0px 2px 2px #ccc", backgroundColor: '#fff'}}></canvas>
                            </div>
                        </div>
                        {/* <div className='row align-items-center'>
                            <div className='col-md-12' style={{ marginTop: '60px' }}>
                                <canvas id="salaryDistributionChart" width="100%" height="300px"></canvas>
                            </div>
                            <div className='col-md-6' style={{ marginTop: '60px' }}>
                                <canvas id="employeeCategoryChart" width="100%" height="200"></canvas>
                            </div>
                            <div className='col-md-6' style={{ marginTop: '60px' }}>
                                <canvas id="ageDistributionChart" width="100%" height="200"></canvas>
                            </div>
                        </div> */}
                    </div>
                ) : null
            }
        </>
    );
};

export default EmployeeCharts;
