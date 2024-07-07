import Header from "../components/navbar"
import Category from "../components/category"
import Searchbar from "../components/searchbar";
import { useState } from "react";


export default function Home() {

    const [searchVal, setSearch] = useState("");
    
    const handleSearch= (searchValue) => {
        setSearch(searchValue);
    }

    return (
        <>
        <div class="tw-bg-gray-100 tw-h-max tw-bg-auto tw-min-h-screen tw-z-0">
            <Header/>

            <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-x-20">
                <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-pb-5">
                    <div class="jumbotron jumbotron-fluid tw-pt-[150px] tw-pb-[80px] tw-text-center">
                        <h1 class="display-4">Online Archive System</h1>
                        <p class="lead">For the students of Regional Science High School Region 1</p>
                    </div>
                
                    <div class="md:tw-w-[80%] sm:tw-w-full sm:tw-px-8 md:tw-bg-white tw-p-6 tw-rounded-lg md:tw-shadow-md tw-bg-opacity-[80%]">
                        <Searchbar search={handleSearch}/>
                        <Category search={searchVal} category={"all-categ"}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}