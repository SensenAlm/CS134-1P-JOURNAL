import React, { useState, useEffect } from 'react'
import { Bar, Pie} from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );
  
export default function AdminDashboard() {
    const [manuscript, setManuscript] = useState({});
    const [student, setStudent] = useState({});

    useEffect(() => {
    
        fetch('http://localhost:8081/admin-dashboard', {
            method: "get",
            })  
            .then(res => res.json())
            .then(data => {setManuscript({category: data.manuscript.Category,
                                            total: data.manuscript.Total
                                        }); setStudent(data.student.Total)})
            .catch(err => console.log(err));
    
            console.log(manuscript);
            console.log(student);
    
    }, [])
    
    
    const PieGraph = () => {

        const data = {
            labels: ['Registered Students', 'Enrolled Students'],
            datasets: [
                {
                    label: 'Total Number of Students',
                    data: [student.registered, student.enrolled],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ]
                },
                
            ]
        }

        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          };

        return (
            <div>
                <p>Total: {student.registered + student.enrolled}</p>
              <Pie data={data} options={options} />
            </div>
          );

    };

    const BarGraph = () => {
        
        const data = {
          datasets: [
            {
              label: 'Total Manuscripts per Category',
              data: manuscript.category,
              barPercentage: 1,
              minBarLength: 2,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                
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
    
    
    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      return (
        
          <Bar data={data} options={options} />
        
      );
    }
    





    return (
        <>
            <div class='tw-container'>
                <BarGraph />
                <PieGraph /> 
             </div>
        </>
    )
}

