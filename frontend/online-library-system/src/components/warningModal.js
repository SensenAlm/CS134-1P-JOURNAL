import React, { useEffect, useState } from 'react'

export default function WarningModal({ visible, titleFile, onConfirmDelete, onClose }) {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        setShow(visible);
    }, [visible])

    const onCloseHandle = (e) => {
        if (e.target.id === "outside" || e.target.id === "button") {
            setShow(false);
            onClose();
        }
    }

    if (!show) return null;

    return (

        <div
            id='outside'
            onClick={onCloseHandle}
            className=' tw-fixed tw-inset-0 tw-z-50 tw-bg-opacity-20 tw-backdrop-blur-sm tw-flex tw-justify-center tw-items-center tw-bg-black'>
            <div className='tw-w-2/6 tw-h-[45%] tw-shadow-lg'>
                <div className='tw-bg-gray-50 tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-between tw-p-6 tw-rounded-lg'>
                    <div>
                        <h2>WARNING</h2>
                    </div>
                    <div>
                        <p className='tw-text-center'>Deleting a file "{titleFile}"?</p>
                    </div>
                    <div className='tw-flex tw-justify-center tw-items-center tw-gap-10'>
                        <button
                            id='button'
                            onClick={(e) => {
                                onCloseHandle(e);
                            }}
                            className='tw-w-32 tw-bg-dark-green tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-dark-steel tw-duration-500 tw-text-gray-50'>Cancel</button>
                        <button
                            id='button'
                            onClick={(e) => {
                                onCloseHandle(e);
                                onConfirmDelete();  
                            }}
                            className='tw-w-32 tw-bg-dark-green tw-rounded-md tw-h-[40px] tw-px-4 tw-border-none tw-outline-none hover:tw-bg-dark-steel tw-duration-500 tw-text-gray-50'>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

