import React from 'react'
import { useState, useMemo, useCallback } from "react"

const Pagination = ({ postsPerPage, setPostsPerPage, totalPosts, paginate, sortType, setSortType }) => {
    const [postPerPage, setPostPerPage] = useState(postsPerPage)

    const pageNumbers = [];

    const change = useCallback(event => {
        if (event.target.value === "") {

        }

        else {
            setPostsPerPage(event.target.value)
        }
    })

    const posts = (event) => {
        setPostsPerPage = event.target.value
    }

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul class="pagination">
                {/* <button onClick={() => setSortType(sortType * -1)}>Sorting</button> */}
                <select type='number' onChange={change} class="tw-rounded-l-md tw-w-full tw-h-[36px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-1 focus:tw-shadow-lg focus:tw-duration-500 tw-mt-[1px] tw-p-[1px]">
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='100'>100</option>
                </select>
                {pageNumbers.map(number => (
                    <li key={number} class="page-item">
                        <a onClick={(event) => paginate(number)} href="##" class='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

{/* <nav>
            <ul class="tw-flex">
                {pageNumbers.map(number => (
                    <li key={number} class="tw-flex tw-flex-row">
                        <a onClick={() => paginate(number)} href="##" class="">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav> */}

export default Pagination
