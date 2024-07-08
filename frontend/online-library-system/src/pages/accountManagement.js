import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Searchbar from '../components/searchbar';

export default function AccountManagement() {
  const [data, setData] = useState([]);
  const [primaryPass, setPass] = useState();
  const [isDeleted, setDeleted] = useState();
  const [searchVal, setSearch] = useState("");
  const url = 'http://localhost:8081';

  useEffect(() => {
    // fetch('http://localhost:8081/getCredentials', {
      fetch(url + '/getCredentials', {
        method: "get",
        })  
        .then(res => res.json())
        .then(data => { 
          console.log(data);
            const edited = data.map((item) => ({...item, state: false}) );
            setData(edited);
              }
            )
        .catch(err => console.log(err));
    
  }, [isDeleted]);
  
  const handleSearch= (searchValue) => {
    setSearch(searchValue);
  }

  const editButton = (d) => {

    setPass(d.password);

    const editData = data.map((d) =>
       ( {...d }) )
       
    setData(editData); 
  }

  const deleteButton = (e, id) => {
    e.preventDefault();
    console.log(id);
    // fetch('http://localhost:8081/deleteCredentials', {
    fetch(url + '/deleteCredentials', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({id: id})
           
    })  
    .then(res => res.json())
    .then(data => alert(data.status))
    .catch(err => console.log(err));

    setDeleted(true);
  }


  const editValue = (e, index) => {
    console.log(e.target.value);
    const edited = data.map((item, i) => 
      i === index ? {...item, [e.target.name]: e.target.value} : item
    )

    setData(edited);
  }

  const doneButton = (e, d) => {
    e.preventDefault();
    
    if (d.password === primaryPass){
      editButton(d);
    }
    else {
      // fetch('http://localhost:8081/editCredentials', {
        fetch(url + '/editCredentials', {
            
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({data: d})
      })
      .then(res => res.json())
      .then(data => alert(data.status))
      .catch(err => console.log(err)); 

      editButton(d);
    }

  }


  return (
    <>
      <div class="tw-flex tw-bg-gray-50 tw-min-h-dvh">
            <div>
                <Sidebar/>
            </div>

            <div class="tw-flex md:tw-mx-20 md:tw-mt-[100px] sm:tw-m-5 tw-align-top tw-w-full">
              <div class="tw-flex-col tw-w-full tw-text-center">
                <label className="tw-text-center tw-text-5xl tw-my-[70px]">PDF Management</label>
                
                <div class="tw-flex-col">
                  <div class="table-striped table-responsive tw-w-full tw-flex tw-flex-row tw-justify-center tw-mt-[60px] ">
                    <div class="tw-w-[70%]">
                      <Searchbar />
                      <table class="table table-striped tw-text-center">
                        <thead class="tw-text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">LRN</th>
                                <th scope="col">Password</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((d, i) => (
                          
                            <tr key={i}>
                                <th scope="row">{i+1}</th>
                                <td>{d.lrn}</td>
                                <td>{d.state
                                    ? <input value={d.password} name="password" onChange={(e) => {editValue(e, i)}} class="tw-rounded-md tw-w-full tw-h-[40px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-p-3 focus:tw-shadow-lg
                                        focus:tw-duration-500 focus:tw-placeholder-transparent"></input>
                                    : <>{d.password}</>}</td>
                                <td class="tw-w-[30px]">{ d.state
                                    ? <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-500" 
                                        onClick={(e) => {d.state = false; doneButton(e, d)}}>
                                            <label class="tw-cursor-pointer tw-text-gray-100">Done</label></button>
                                    : <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-500" 
                                        onClick={() => {d.state = true;editButton(d)}}>
                                            <label class="tw-cursor-pointer tw-text-gray-100">Edit</label></button>
                                }</td>
                                <td class="tw-w-[30px]">
                                    <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-500" 
                                        onClick={(e) => deleteButton(e, d._id)}>
                                            <label class="tw-cursor-pointer tw-text-gray-100">Delete</label></button>
                                </td>
                            </tr>

                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
      </div>
    </>
  )
}
