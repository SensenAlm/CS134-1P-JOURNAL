import { useState } from "react"
import axios from "axios"
import logo from '../img/RSHS_1_Logo.png'
import { useNavigate } from "react-router-dom"

export default function Register() {

    const [studentLrn, setLrn] = useState("");
    const [studentPass, setPassword] = useState("");
    const [confirmPass, checkPassword] = useState("");
    const navigate = useNavigate();

    const submitRegForm= async(e) => {
        e.preventDefault();

        if (studentPass === confirmPass){
            const formData = new FormData();
            formData.append("lrn", studentLrn);
            formData.append("password", studentPass);

            console.log(studentLrn, studentPass);
            
            const uploadAPI = await axios.post("http://localhost:8081/register-stud", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });

            console.log(uploadAPI);
            alert(uploadAPI.data.status);

            setLrn("");
            setPassword("");
            checkPassword("");
        }

        else{
            alert("Password does not match!");
            setPassword("");
            checkPassword("");
        }
    }

    const navToLogin = () => {
        navigate('/');
    }

    return (
        <>
        <div class="tw-bg-[url('/src/img/bg.jpg')] tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-min-h-dvh tw-min-w-full tw-gap-x-16 tw-gap-y-px">
            <div class="md:tw-text-left tw-text-left sm:tw-text-center tw-font-archivo-black md:tw-pb-[200px]">
                <h1 class="tw-text-7xl">Regional Science</h1>
                <h1 class="tw-text-7xl">High School</h1>
                <h3 class="tw-p-0.5">Region 1</h3>
            </div>
            <div class="md:tw-bg-gray-100 sm:tw-bg-gray-200 md:tw-bg-opacity-[80%] sm:tw-bg-opacity-[70%] tw-h-max tw-shadow-lg tw-rounded-lg">
                <div class="tw-pt-5 tw-flex tw-justify-center tw-items-center tw-font-roboto">
                    <img src={logo} class="tw-h-20 tw-w-20 tw-text-left" alt="RSHS Logo"/>
                    <h1>Sign Up</h1>
                </div>
                <form className="formStyle tw-w-96 tw-mx-auto tw-p-4" onSubmit={submitRegForm}>
                    <div class="elements tw-p-2.5 tw-w-full">
                        <div class="form-group">
                            <label for="lrnLabel">Student LRN </label>
                            <input class="form-control focus:tw-placeholder-transparent" id="lrnInput" placeholder="LRN" required onChange={(e) => setLrn(e.target.value)} value={studentLrn}/>
                        </div>
                    </div>
                    <div class="elements tw-p-2.5 tw-w-full">
                        <div class="form-group">
                                <label for="passwordInput">Password</label>
                                <input type="password" class="form-control focus:tw-placeholder-transparent" id="passwordInput" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={studentPass}/>
                            </div>
                    </div>
                    <div class="elements tw-p-2.5 tw-w-full">
                        <div class="form-group">
                                <label for="confirmpassInput">Confirm Password</label>
                                <input type="password" class="form-control focus:tw-placeholder-transparent" id="confirmpassInput" placeholder="Password" required onChange={(e) => checkPassword(e.target.value)} value={confirmPass}/>
                            </div>
                    </div>
                    <div class="elements tw-p-2.5 tw-w-full tw-font-roboto">
                        <button type="submit" class="rgtbutton tw-flex tw-justify-center tw-items-center tw-w-full tw-bg-steel-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-hover-blue tw-duration-500">
                            <label class="tw-cursor-pointer tw-text-gray-50">Sign Up</label></button>
                    </div>

                    <hr />
                    <div class="elements tw-p-2.5 tw-w-full tw-font-roboto">
                        <button class="lgnbutton tw-flex tw-justify-center tw-items-center tw-w-full tw-bg-steel-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-hover-blue tw-duration-500" 
                            onClick={navToLogin}>
                            <label class="tw-cursor-pointer tw-text-gray-50">Login</label></button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}