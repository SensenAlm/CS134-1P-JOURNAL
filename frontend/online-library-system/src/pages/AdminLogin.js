import { useState } from 'react';
import logo from '../img/RSHS_1_Logo.png';
import OTPModal from '../components/modal';

export default function AdminLogin() {

    const [showModal, setModal] = useState(false)
    const handleOnClose = () => setModal(false)
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [otp, setOTP] = useState();
    const [token, setToken] = useState();

    const login = (e) => {
        e.preventDefault();
        fetch('http://localhost:8081/getToken', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password, user: "Admin"})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.status === "Success!") {
                console.log(data);
                alert(data.status);
                setOTP(data.otp);
                setToken(data.token);
                setModal(true);
                
            }
            else if (data.status === "Incorrect Email!") {
                alert(data.status);
                setEmail("");
                setPass("");
            }
            else {
                alert(data.status);
                setPass("");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
        <div className="tw-bg-[url('/src/img/bg.jpg')] tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-min-h-dvh tw-min-w-full tw-gap-x-16 tw-gap-y-px">
            <div class="md:tw-text-left tw-text-left sm:tw-text-center tw-font-archivo-black md:tw-pb-[200px]">
                <h1 class="tw-text-7xl">Regional Science</h1>
                <h1 class="tw-text-7xl">High School</h1>
                <h3 class="tw-p-0.5">Region 1</h3>
            </div>
            
            <div class="md:tw-bg-gray-100 sm:tw-bg-gray-200 md:tw-bg-opacity-[80%] sm:tw-bg-opacity-[70%] tw-h-max tw-shadow-lg tw-rounded-lg">
                <div class="tw-pt-5 tw-flex tw-justify-center tw-items-center tw-font-roboto">
                    <img src={logo} class="tw-h-20 tw-w-20 tw-text-left" alt="RSHS Logo"/>
                    <h1>Admin</h1>
                </div>
                <form class="formStyle tw-w-96 tw-mx-auto tw-p-4" onSubmit={login}>
                    <div class="elements tw-p-2.5 tw-w-full">
                        <div class="form-group">
                            <label for="lrnLabel">Email Address</label>
                            <input class="form-control focus:tw-placeholder-transparent" id="lrnInput" placeholder="Email Address" 
                                value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div class="elements tw-p-2.5 tw-w-full">
                        <div class="form-group">
                                <label for="passwordInput">Password</label>
                                <input type="password" class="form-control focus:tw-placeholder-transparent" id="passwordInput" placeholder="Password" 
                                    value={password} onChange={e => setPass(e.target.value)}/>
                            </div>
                    </div>
                    <div class="elements tw-p-2.5 tw-w-full tw-font-roboto">
                        <button type="submit" class="lgnbutton tw-flex tw-justify-center tw-items-center tw-w-full tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-500"
                            >
                            <label class="tw-cursor-pointer tw-text-gray-50">Login</label></button>
                    </div>
                </form>
            </div>

            <OTPModal otp={otp} token = {token} onClose={handleOnClose} visible={showModal} />
        </div>
        </>
    )
}