import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import logo from '../img/RSHS_1_Logo.png'
import { Delete } from '../hooks/authorize';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActivePage = (path) => location.pathname === path;

    const navToPDF = () => {
        navigate('/admin-access');
    }

    const navToDashboard = () => {
        navigate('/admin-dashboard');
    }

    const navToManagement = () => {
        navigate('/admin-pdf-management');
    }

    const navToCateg = () => {
        navigate('/admin-manage-categ');
    }

    const navToMonitor = () => {
        navigate('/admin-monitor');
    }

    const navToAccount = () => {
        navigate('/admin-student-management');
    }

    const navToLogin = () => {
        Delete();
        navigate('/admin-login');
    }

    return (
        <>
            <div class="tw-top-0 tw-sticky">
                {/* <div class={`${open ? "tw-w-72" : "tw-w-20"} tw-flex tw-flex-col tw-bg-dark-blue tw-h-screen tw-pt-8 tw-sticky tw-duration-300`}> */}
                <div class={`tw-flex tw-flex-col tw-bg-dark-blue tw-h-screen tw-pt-8 tw-sticky tw-duration-300 tw-w-72`}>
                    <div class="tw-flex tw-basis-5 tw-mx-auto">
                        {/* <img src={logo} class={`tw-duration-500 tw-h-20 tw-w-20 ${open && "tw-w-[200px] tw-h-[200px]"}`} */}
                        <img src={logo} class={`tw-duration-500 tw-w-[200px] tw-h-[200px]`}
                    /*onClick={() => setOpen(!open)}*/ />
                    </div>

                    <div class="tw-mt-3 tw-flex tw-flex-col tw-duration-300 tw-cursor-pointer tw-gap-y-2 tw-mx-5">
                        <button class={`${isActivePage('/admin-pdf-monitor') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToDashboard}>
                            <i class={`bi bi-bar-chart-line-fill tw-cursor-pointer tw-mr-2`} />
                            <label class={`tw-cursor-pointer`}>Dashboard</label>
                        </button>

                        <button class={`${isActivePage('/admin-access') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToPDF}>
                            <i class={`tw-mr-2 bi bi-file-arrow-down-fill tw-cursor-pointer`} />
                            <label class={`tw-cursor-pointer`}>Upload PDF</label>
                        </button>

                        <button class={`${isActivePage('/admin-pdf-management') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToManagement}>
                            <i class={`tw-mr-2 bi bi-pencil-square tw-cursor-pointer`} />
                            <label class={`tw-cursor-pointer`}>Edit PDF</label>
                        </button>

                        {/* <button class={`${isActivePage('/admin-manage-categ') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToCateg}>
                            <i class={`tw-mr-2 bi bi-pencil-square tw-cursor-pointer`} />
                            <label class={`tw-cursor-pointer`}>Manage Category</label>
                        </button> */}

                        <button class={`${isActivePage('/admin-monitor') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToMonitor}>
                            <i class={`bi bi-person-fill tw-cursor-pointer tw-mr-2`} />
                            <label class={`tw-cursor-pointer`}>Student Monitor</label>
                        </button>

                        <button class={`${isActivePage('/admin-student-management') ? "tw-bg-slate-500" : ""} tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToAccount}>
                            <i class={`bi bi-person-fill-gear tw-cursor-pointer tw-mr-2`}></i>
                            <label class={`tw-cursor-pointer`}>Account Settings</label>
                        </button>

                        <button class={`tw-text-left tw-text-lg tw-w-full tw-rounded-md tw-py-2 tw-border-none tw-bg-transparent tw-text-white hover:tw-bg-slate-500`}
                            onClick={navToLogin}>
                            <i class={`bi bi-box-arrow-left tw-cursor-pointer tw-mr-2`}></i>
                            <label class={`tw-cursor-pointer`}>Sign Out</label>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}