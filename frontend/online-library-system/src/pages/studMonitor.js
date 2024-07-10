import { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Searchbar from "../components/searchbar";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

export default function Monitor() {
    const [credData, setCred] = useState([]);
    const [studData, setStud] = useState([]);

    const [enrolledStud, setEnrolledStud] = useState([]);
    const [registeredStud, setRegisteredStud] = useState([]);

    const [searchVal, setSearch] = useState("");
    
    const handleSearch= (searchValue) => {
        setSearch(searchValue);
    }

    useEffect(() => {
      fetch("http://localhost:8081/studentStatus/?lrn=" + searchVal, {
        method: "get",
        })
      .then(res => res.json())
      .then(data => {

        setEnrolledStud(data.listTable.enrolled.data);
        setRegisteredStud(data.listTable.register.data);
      })
      .catch(err => console.log(err));
    }, [searchVal])


    
    const statusList = enrolledStud.map((d) => {
        const isRegistered = registeredStud.find((x) => x.lrn === d.lrn);
        return { ...d,
            status: isRegistered ? 'Registered' : 'Not Registered',
            registered: isRegistered ? isRegistered.regDate : "-"
        };
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        // Show a confirmation prompt
        const confirmUpload = window.confirm(`Are you sure you want to upload the file: ${file.name}?`);

        if (confirmUpload) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const data = results.data.map(row => ({
                        lrn: row["LRN"],
                        lastname: row["Last Name"],
                        firstname: row["First Name"],
                        middlename: row["Middle Name"],
                    }));

                    fetch('http://localhost:8081/upload-students', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.status);
                    })
                    .catch((error) => {
                        alert('Error uploading data');
                    });
                },
            });
        } else {
            event.target.value = "";
        }
    };

    const csvHeaders = [
        { label: "LRN", key: "lrn" },
        { label: "Last Name", key: "lastname" },
        { label: "First Name", key: "firstname" },
        { label: "Middle Name", key: "middlename" },
    ];

    const auditExport = (e) => {
        fetch("http://localhost:8081/audit-export")
    }

    return (
        <>
            <div className="tw-flex tw-bg-gray-50 tw-min-h-dvh">
                <div>
                    <Sidebar />
                </div>
                <div className="tw-flex sm:tw-flex-wrap tw-flex-col tw-w-full md:tw-mx-20 md:tw-mt-[100px] sm:tw-m-5 tw-align-top">
                    <label className="tw-text-center tw-text-5xl tw-pb-[100px]">Enrolled Students</label>
                    <div className="tw-flex tw-mb-4 tw-items-center">
                        <input 
                            className="file:tw-rounded-l-md tw-block file:tw-h-[40px] file:tw-border-none tw-outline-none tw-rounded-md tw-ring-1
                            tw-ring-gray-300 focus:tw-ring-gray-500 file:tw-bg-dark-blue file:tw-px-3 file:tw-text-white
                            focus:tw-ring-1 focus:tw-shadow-lg file:hover:tw-bg-light-steel file:tw-duration-500 file:hover:tw-cursor-pointer"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                        />
                        <CSVLink 
                            headers={csvHeaders}
                            data={studData}
                            filename={"students.csv"}
                            className="tw-bg-dark-blue tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-light-steel tw-duration-500 tw-ml-4"
                            onClick={auditExport}>
                            Export CSV
                        </CSVLink>
                        <div className="tw-ml-auto tw-w-full md:tw-w-1/2 lg:tw-w-1/3">
                            <Searchbar search={handleSearch} className="tw-w-max" />
                        </div>
                    </div>
                    {/* <div className="category table-striped table-responsive tw-w-[100%] sm:tw-w-full tw-flex tw-align-center tw-flex-col">
                        <table className="table table-striped tw-text-center">
                            <thead className="tw-text-center">
                                <tr>
                                    <th scope="col">LRN</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Middle Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studData.map((d, i) => (
                                    <tr key={i}>
                                        <th>{d.lrn}</th>
                                        <td>{d.lastname}</td>
                                        <td>{d.firstname}</td>
                                        <td>{d.middlename}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                    <div>
        <section class="tw-container tw-mx-auto tw-p-6 ">
            <div class="tw-w-full tw-mb-8 tw-overflow-hidden tw-rounded-lg tw-shadow-lg">
                <div class="tw-w-full tw-overflow-x-auto">
                    <table class="tw-w-full">
                        <thead>
                            <tr class="tw-text-md tw-font-semibold tw-tracking-wide tw-text-left tw-text-gray-900 tw-bg-gray-100 tw-uppercase tw-border-b tw-border-gray-600">
                                <th class="tw-px-4 tw-py-3">Name</th>
                                <th class="tw-px-4 tw-py-3">LRN</th>
                                <th class="tw-px-4 tw-py-3">Status</th>
                                <th class="tw-px-4 tw-py-3">Date Registered</th>
                            </tr>
                        </thead>
                        <tbody class="tw-bg-white">
                            {statusList.map((d, i) => (
                                <tr class="tw-text-gray-700">
                                    <td class="tw-px-4 tw-py-3 tw-border">
                                        <div class="tw-flex tw-items-center tw-text-sm">
                                            <p class="tw-font-semibold tw-text-black">{d.firstname +" "+ d.lastname}</p>
                                        </div>
                                    </td>
                                    
                                    <td class="tw-px-4 tw-py-3 tw-text-ms tw-font-semibold tw-border">{d.lrn}</td>

                                    <td class="tw-px-4 tw-py-3 tw-text-xs tw-border">
                                        <span class="tw-px-2 tw-py-1 tw-font-semibold tw-leading-tight tw-bg-gray-100 tw-rounded-sm">{d.status} </span>
                                    </td>
                    
                                    <td class="tw-px-4 tw-py-3 tw-text-sm tw-border">{d.registered}</td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </div>


                    
                </div>
            </div>
        </>
    );
}
