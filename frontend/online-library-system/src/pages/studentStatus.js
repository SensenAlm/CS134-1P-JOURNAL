import React, { useEffect, useState } from 'react'

export default function Status() {

    const [enrolledStud, setEnrolledStud] = useState([]);
    const [registeredStud, setRegisteredStud] = useState([]);

    useEffect(() => {
    //   fetch("http://localhost:8081/studentStatus", {
        fetch("https://online-library-system-api.onrender.com/studentStatus", {
        method: "get",
        })
      .then(res => res.json())
      .then(data => {

        setEnrolledStud(data.listTable.enrolled.data);
        setRegisteredStud(data.listTable.register.data);
      })
      .catch(err => console.log(err));
    }, [])


    
    const statusList = enrolledStud.map((d) => {
        const isRegistered = registeredStud.find((x) => x.lrn === d.lrn);
        return { ...d,
            status: isRegistered ? 'Registered' : 'Not Registered',
            registered: isRegistered ? isRegistered.regDate : "-"
        };
    });

    console.log(statusList);
  
  return (
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
  )
}
 