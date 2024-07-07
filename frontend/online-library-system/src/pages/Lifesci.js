import Header from "../components/navbar"
import Searchbar from "../components/searchbar";
import Category from "../components/category";
import { useState } from "react";

export default function LifeSci() {


    const [searchVal, setSearch] = useState("");
    
    const handleSearch= (searchValue) => {
        setSearch(searchValue);
    }

    return (
        <>
        <div class="tw-bg-gray-100 tw-h-max tw-bg-auto tw-min-h-screen tw-z-0">
            <Header/>

            <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-x-20">
                <h1 class="display-4 tw-w-5/6 tw-pt-[150px] tw-pb-[80px] tw-text-center">Life Science</h1>
                
                <div class="md:tw-w-[80%] sm:tw-w-full sm:tw-px-8 md:tw-bg-white tw-p-6 tw-rounded-lg md:tw-shadow-md tw-bg-opacity-[80%]">
                    <Searchbar search={handleSearch}/>         
                    <Category search={searchVal} category={"life-sci-categ"}/>
                </div>
            </div>
        </div>
        </>
       
    )
}