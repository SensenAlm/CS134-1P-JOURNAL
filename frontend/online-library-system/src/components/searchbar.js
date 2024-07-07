import { useState} from 'react';

export default function Searchbar( {search} ) {

    const [value, setValue] = useState("");

    const submitSearch = (e) => {
        
        e.preventDefault();
        search(value);
    }

    return (
        <>
        <div class="tw-w-full tw-mb-2">
            <nav class="navbar tw-flex tw-flex-row-reverse">
                <div class="md:tw-w-[40%] sm:tw-w-full" id="searchBar">
                <form class="tw-flex" role="search" onSubmit={(e) => submitSearch(e)}>
                    <input class="tw-rounded-full tw-w-full tw-h-[45px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-p-3 focus:tw-shadow-lg
                         focus:tw-duration-500 focus:tw-placeholder-transparent" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}>
                        
                    </input>
                    <button class="tw-bg-green tw-rounded-full tw-px-[15px] tw-ml-[-45px] tw-border-none tw-outline-none hover:tw-bg-dark-green tw-duration-500" type="submit">
                        <i class="bi bi-search tw-text-white"></i>
                    </button>
                </form>
                </div>
            </nav>
        </div>
        </>
    )
}