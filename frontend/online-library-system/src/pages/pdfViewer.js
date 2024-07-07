import Header from "../components/navbar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ViewerPage() {

    const { dest }= useParams();

    return (
        <>
        <div class="tw-bg-gray-100 tw-h-max tw-bg-auto tw-min-h-screen tw-z-0">
            <Header/>

            <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-x-20">
                <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
                
                    <div class="jumbotron jumbotron-fluid tw-pt-[150px] tw-text-center tw-mb-[50px]">
                        <h1 class="display-4">Online Archive System</h1>
                    </div>
                
                    <div class="tw-h-[90%] tw-w-[70%] sm:tw-w-[100%]">
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
                            <Viewer fileUrl={'http://localhost:8081/uploads/' + dest}/>
                        </Worker>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}