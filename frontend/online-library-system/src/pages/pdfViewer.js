import Header from "../components/navbar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ViewerPage() {

    const { dest }= useParams();
    const navigate = useNavigate();
    const url = 'http://localhost:8081';

    const navToHome = () => {
        navigate('/');
    }

    const PdfViewerComponent = ({ pdfUrl }) => {
        
    
        return (
            <div className="tw-h-[80vh] tw-overflow-y-scroll sm:tw-w-full">
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl} />
                </Worker>
            </div>
        );
    }
    return (
        <>
        <div class="tw-bg-gray-100 tw-h-max tw-bg-auto tw-min-h-screen tw-z-0">
            <Header/>

            <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-my-[50px]">
                <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
                
                    {/* <div class="jumbotron jumbotron-fluid tw-pt-[150px] tw-text-center tw-mb-[50px]">
                        <h1 class="display-4">Online Archive System</h1>
                    </div> */}
                
                    <div class="tw-h-[90%] tw-w-[50%] sm:tw-w-[100%]">
                        {/* <PdfViewerComponent pdfUrl={'http://localhost:8081/uploads/' + dest} /> */}
                        <PdfViewerComponent pdfUrl={url + '/uploads/' + dest} />
                    </div>
                </div>
            </div>

            <div class="sm:tw-hidden tw-sticky tw-w-full tw-pr-[300px]">
                <button class="tw-absolute tw-bottom-6 tw-right-[60px] tw-w-[150px] tw-h-[55px] tw-bg-leaf-green tw-rounded-md tw-px-4 tw-border-none 
                tw-outline-none hover:tw-bg-hover-green tw-duration-500 tw-text-gray-50" 
                onClick={navToHome}>Return to Home Page</button>
            </div>
        </div>
        </>
    )
}