// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function OTPModal({otp, token, visible, onClose }) {
//     const [one, setOne] = useState("");
//     const [two, setTwo] = useState("");
//     const [three, setThree] = useState("");
//     const [four, setFour] = useState("");
//     const [five, setFive] = useState("");
//     const [six, setSix] = useState("");
//     const navigate = useNavigate();

//     const userInput = one + two + three + four + five + six;



//     const verifyOTP = (e) => {
//         if (userInput === otp) {

//             localStorage.setItem("token", JSON.stringify(token));
//             navigate("/admin-access");
//             window.location.reload();

//         }

//         else {
//             alert("Wrong OTP. Please try again!");
//             setOne("");
//             setTwo("");
//             setThree("");
//             setFour("");
//             setFive("");
//             setSix("");
//         }
//     }


//     if(!visible) return null;

//     return (
//         <div class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center">
//             <div class="tw-bg-gray-50 tw-rounded-lg tw-shadow-lg md:tw-p-5 sm:tw-w-full sm:tw-mx-5 sm:tw-h-[45%]">
//                 <div class="tw-flex tw-flex-row-reverse">
//                     <button class="tw-border-none tw-bg-transparent tw-m-2" onClick={onClose}>
//                         <i class="bi bi-x-lg"></i>
//                     </button>
//                 </div>

//                 <h3 class="tw-font-semibold tw-text-center tw-text-xl tw-text-gray-700 tw-my-5">
//                 One-Time Password
//                 </h3>

//                 <div class="tw-flex tw-flex-row tw-my-9 tw-w-full tw-gap-x-3 tw-justify-center">
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="1" maxlength="1" value={one} onChange={e => setOne(e.target.value)}/>
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="2" maxlength="1" value={two} onChange={e => setTwo(e.target.value)}/>
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="3" maxlength="1" value={three} onChange={e => setThree(e.target.value)}/>
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="4" maxlength="1" value={four} onChange={e => setFour(e.target.value)}/>
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="5" maxlength="1" value={five} onChange={e => setFive(e.target.value)}/>
//                     <input class="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 focus:tw-ring-1 tw-p-2 tw-rounded tw-w-10 tw-text-center focus:tw-placeholder-transparent"
//                         placeholder="6" maxlength="1" value={six} onChange={e => setSix(e.target.value)}/>
//                 </div>

//                 <p class="tw-m-2 tw-text-center">One-Time Password is sent, please check your Email.</p>

//                 <div class="tw-text-center tw-m-9">
//                     <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-dark-steel tw-duration-500 tw-text-gray-50"
//                     onClick={(e) => {verifyOTP(e)}}>
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OTPModal({ otp, token, visible, onClose }) {
    const [one, setOne] = useState("");
    const [two, setTwo] = useState("");
    const [three, setThree] = useState("");
    const [four, setFour] = useState("");
    const [five, setFive] = useState("");
    const [six, setSix] = useState("");
    const navigate = useNavigate();

    const inputRefs = useRef([]);

    useEffect(() => {
        if (visible) {
            inputRefs.current[0].focus();
        }
    }, [visible]);

    const userInput = one + two + three + four + five + six;

    const verifyOTP = () => {
        if (userInput === otp) {
            localStorage.setItem("token", JSON.stringify(token));
            navigate("/admin-dashboard");
            window.location.reload();
        } else {
            alert("Wrong OTP. Please try again!");
            setOne("");
            setTwo("");
            setThree("");
            setFour("");
            setFive("");
            setSix("");

            inputRefs.current[0].focus();
        }
    }

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1].focus();
        }
        switch (index) {
            case 0:
                setOne(value);
                break;
            case 1:
                setTwo(value);
                break;
            case 2:
                setThree(value);
                break;
            case 3:
                setFour(value);
                break;
            case 4:
                setFive(value);
                break;
            case 5:
                setSix(value);
                break;
            default:
                break;
        }
    }

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text');
        const pasteArray = pasteData.split('').slice(0, 6);
        
        setOne(pasteArray[0] || '');
        setTwo(pasteArray[1] || '');
        setThree(pasteArray[2] || '');
        setFour(pasteArray[3] || '');
        setFive(pasteArray[4] || '');
        setSix(pasteArray[5] || '');
        
        inputRefs.current[pasteArray.length - 1].focus();
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    if (!visible) return null;

    return (
        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center">
            <div className="tw-bg-gray-50 tw-rounded-lg tw-shadow-lg md:tw-p-5 sm:tw-w-full sm:tw-mx-5 sm:tw-h-[45%]">
                <div className="tw-flex tw-flex-row-reverse">
                    <button className="tw-border-none tw-bg-transparent tw-m-2" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <h3 className="tw-font-semibold tw-text-center tw-text-xl tw-text-gray-700 tw-my-5">
                    One-Time Password
                </h3>

                <div className="tw-flex tw-flex-row tw-my-9 tw-w-full tw-gap-x-3 tw-justify-center">
                    {[setOne, setTwo, setThree, setFour, setFive, setSix].map((setFunc, index) => (
                        <input
                            key={index}
                            className="tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-400 focus:tw-ring-gray-700 tw-p-2 tw-rounded tw-w-10 tw-text-center"
                            maxLength="1"
                            value={[one, two, three, four, five, six][index]}
                            onChange={e => handleChange(e, index)}
                            onPaste={handlePaste}
                            onKeyDown={e => handleKeyDown(e, index)}
                            ref={el => inputRefs.current[index] = el}
                        />
                    ))}
                </div>

                <p className="tw-m-2 tw-text-center">One-Time Password is sent, please check your Email.</p>

                <div className="tw-text-center tw-m-9">
                    <button
                        className="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-dark-steel tw-duration-500 tw-text-gray-50"
                        onClick={verifyOTP}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
    