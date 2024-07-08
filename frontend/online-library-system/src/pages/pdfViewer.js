import Header from "../components/navbar"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function ViewerPage() {

    const { dest } = useParams();
    const url = 'https://cs134-1p-journal-oftf.onrender.com';

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
                <Header />

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

            </div>
        </>
    )
}