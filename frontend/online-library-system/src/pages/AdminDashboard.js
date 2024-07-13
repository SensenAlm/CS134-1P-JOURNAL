import React, { useState, useEffect } from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2';
import Sidebar from '../components/sidebar';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
    
  );
  
export default function AdminDashboard() {

    const [manuscript, setManuscript] = useState({});
    const [student, setStudent] = useState({});
    const [logs, setLogs] = useState({});
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const hour = today.getHours();

    const timeData = [];

    const datas = [];
    

    useEffect(() => {
      
       fetch('http://localhost:8081/admin-dashboard', {
          method: "get",
          })  
          .then(res => res.json())
          .then(data => {setManuscript(data.manuscript.Category);
                                      setStudent(data.student.Total);
                                      setLogs(data.logs);
                                      })
          .catch(err => console.log(err));
      
  }, []);
    
    
    // const setdataLine = () => {
      
      
    // }
    
    
    
    for ( var i = 0; i <= hour; i++) {
      timeData.push(i);
      datas.push(0);
    }
    if (logs.admin)
    {logs.admin.forEach(element => {

      var elementDate = new Date(element.date);

      var Elday = elementDate.getDate();
      var Elmonth = elementDate.getMonth();
      var Elyear  = elementDate.getFullYear();
      var Elhour = elementDate.getHours();

      if (Elday === day && Elmonth === month && Elyear === year) {
        datas[Elhour] = datas[Elhour] + 1;
      }
    });}

    if(logs.student)
    {logs.student.forEach(element => {
      var elementDate = new Date(element.date);

      var Elday = elementDate.getDate();
      var Elmonth = elementDate.getMonth();
      var Elyear  = elementDate.getFullYear();
      var Elhour = elementDate.getHours();

      if (Elday === day && Elmonth === month && Elyear === year) {
        datas[Elhour] = datas[Elhour] + 1;
      }
    });}
    
    const LineChart = () => {
      const data = {
        labels: timeData,
        datasets: [
          {
            label: 'Number of Entries Day' ,
            data: datas,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
          },
          
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Student Traffic ' + (month + 1).toString() + " " + day.toString() + ", "  + year.toString(),
          },
        },
      };
     
      return(
        <>
        <div class="tw-w-[100%] tw-m-auto tw-shadow-md">
          <div class="tw-bg-gray-50">
            <Line data={data} options={options} />
          </div>
        </div>
        </>
      );
    };

    const PieGraph = () => {

        const data = {
            labels: ['Registered Students', 'Enrolled Students'],
            datasets: [
                {
                    label: 'Total Number of Students',
                    data: [student.registered, student.enrolled],
                    backgroundColor: [
                        'rgba(255, 205, 86, 0.7)',
                        'rgb(54, 162, 235, 0.7)',
                    ]
                },
                
            ]
        }

        const options = {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Enrolled Students vs. Registered Students'
              }
            },
          };

        return (
            <>
              <div class="tw-flex tw-flex-col ">
                <div class="tw-flex tw-bg-gray-50 tw-text-center tw-flex-row tw-h-[120px] tw-w-full tw-justify-center tw-p-5 tw-rounded-t-md tw-shadow-md">
                  <div class="tw-my-auto tw-text-right tw-pr-[30px]">
                    <i class="bi bi-person-fill tw-text-8xl tw-opacity-[60%]"></i>
                  </div>
                  <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col">
                    <label class="tw-text-6xl tw-text-dark-blue">{student.enrolled + student.registered}</label>
                    <label class="tw-text-lg tw-opacity-[70%]">Total Students</label>
                  </div>
                </div>
                <div class="tw-bg-gray-50 tw-flex tw-rounded-b-md tw-shadow-md tw-pb-3">
                  <Pie data={data} options={options}/>
                </div>
              </div>
            </>
          );

    };

    const BarGraph = () => {
        
        const data = {
          datasets: [
            {
              label: 'Total Manuscripts per Category',
              data: manuscript,
              barPercentage: 1,
              minBarLength: 2,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                
              ],
              borderWidth: 3
            },
          ],
        };
    
    
      const graphStyle = {
          minHeight: "10rem",
          maxWidth: "540px",
          width: "100%",
          border: "1px solid #C4C4C4",
          borderRadius: "0.375rem",
          padding: "0.5rem",
      };

    const options = {
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        title: {
          display: true,
          text: 'Total Journals per Category'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      }
    }

      return (
        <div class="tw-w-[100%] tw-m-auto tw-flex tw-flex-col tw-shadow-md">
          <div class="tw-bg-gray-50">
            <Bar data={data} options={options} />
          </div>
        </div>
      );
    }
    
    return (
        <>
        <div className="tw-flex tw-bg-gray-200 tw-min-h-dvh">
          <div>
              <Sidebar />
          </div>

          <div class="tw-flex tw-flex-col tw-w-full">
          <label className="tw-text-center tw-text-5xl tw-my-[50px]">Dashboard</label>

            <div class="tw-flex tw-flex-row tw-gap-x-9 tw-justify-center">
              <div class="tw-flex-row tw-w-[70%]">
                <div class="tw-flex tw-flex-row tw-w-full tw-justify-between tw-mb-5 tw-gap-x-4">

                  <div class="tw-w-[100%] md:tw-h-[58%] tw-flex tw-flex-col">
                    <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md">
                      <label class="tw-text-6xl tw-text-dark-blue">{manuscript.Life_Science}</label>
                      <label class="tw-text-sm tw-opacity-[70%]">Manuscripts</label>
                      <label class="tw-text-xl tw-opacity-[70%]">Life Science</label>
                    </div>
                  </div>
                  <div class="tw-w-[100%] md:tw-h-[58%] tw-flex tw-flex-col">
                    <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md">
                      <label class="tw-text-6xl tw-text-dark-blue">{manuscript.Mathematics}</label>
                      <label class="tw-text-sm tw-opacity-[70%]">Manuscripts</label>
                      <label class="tw-text-xl tw-opacity-[70%]">Mathematics</label>
                    </div>
                  </div>
                  <div class="tw-w-[100%] md:tw-h-[58%] tw-flex tw-flex-col">
                    <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md">
                      <label class="tw-text-6xl tw-text-dark-blue">{manuscript.Social_Science}</label>
                      <label class="tw-text-sm tw-opacity-[70%]">Manuscripts</label>
                      <label class="tw-text-xl tw-opacity-[70%]">Social Science</label>
                    </div>
                  </div>
                  <div class="tw-w-[100%] md:tw-h-[58%] tw-flex tw-flex-col">
                    <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md">
                      <label class="tw-text-6xl tw-text-dark-blue">{manuscript.Physical_Science}</label>
                      <label class="tw-text-sm tw-opacity-[70%]">Manuscripts</label>
                      <label class="tw-text-xl tw-opacity-[70%]">Physical Science</label>
                    </div>
                  </div>
                  <div class="tw-w-[100%] md:tw-h-[58%] tw-flex tw-flex-col">
                    <div class="tw-my-auto tw-font-roboto tw-text-left tw-flex tw-flex-col tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-md">
                      <label class="tw-text-6xl tw-text-dark-blue">{manuscript.Robotics}</label>
                      <label class="tw-text-sm tw-opacity-[70%]">Manuscripts</label>
                      <label class="tw-text-xl tw-opacity-[70%]">Robotics</label>
                    </div>
                  </div>
                </div>
                <div class="tw-flex tw-flex-row tw-w-[100%] tw-gap-10 tw-flex-wrap tw-justify-between">
                  <div class="tw-w-[48%]"><BarGraph /></div>
                  <div class="tw-w-[48%]"><LineChart/></div>
                </div>
              </div>

              <div class="">
                <PieGraph />
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

