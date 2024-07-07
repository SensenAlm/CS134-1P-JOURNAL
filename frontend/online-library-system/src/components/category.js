import { useEffect, useState } from "react"
import axios from "axios";
import Pagination from "./Pagination";
import { Link } from 'react-router-dom';

export default function Category({ search, category }) {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentpage] = useState(1);
    const [postsPerPage, setPostsperpage] = useState(5); //Post per page

    const [sortingType, setSortingType] = useState(1) //1: Ascending || -1: Descending

    useEffect(() => {
        if (search.length === 0) {
            fetch('http://localhost:8081/' + category, {
                method: "get",
            })
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err));
        }

        else {
            const journal = {
                Search: search,
                Categ: category,
            }
            fetch('http://localhost:8081/searchbar-category', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(journal)
                // headers: new Headers({
                //   "ngrok-skip-browser-warning": "89420",
                // }),
            })
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => console.log(err));
        }

    }, [search])

    const updStat = (pdfdestination, title) => {

        console.log(pdfdestination);
        fetch('http://localhost:8081/viewAdd', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ Title: title })
        });

        // window.open('http://localhost:8081/uploads/' + pdfdestination);
    }

    // const DownloadPDF = (pdfdestination, title) => {

    //     fetch('http://localhost:8081/downloadAdd', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({Title: title})
    //     });

    //     axios.get('http://localhost:8081/uploads/' + pdfdestination, {
    //         responseType: 'blob',
    //         headers: {
    //             'Content-Type': 'application/pdf',
    //         }
    //     })
    //     .then((obj) => {
    //         const url = URL.createObjectURL(obj.data);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = pdfdestination;
    //         a.style.display = 'none';
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         URL.revokeObjectURL(url);
    //     })
    //     .catch(err => console.error(err));
    // }


    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = data
        .sort((a, b) => {
            return sortingType * a.title.localeCompare(b.title)
        })
        .slice(indexOfFirstPost, indexOfLastPost);

    //Change page
    const setPostCount = (postCount) => setPostsperpage(postCount);
    const paginate = (pageNumber) => setCurrentpage(pageNumber);
    const sorting = (type) => setSortingType(type)

    return (
        <div class="">
            <table class=" tw-table-fixed tw-text-center tw-w-full">
                <thead class="tw-text-center tw-bg-steel-blue">
                    <tr class="tw-text-text-blue">
                        {/* <th class="sm:tw-hidden">No.</th> */}
                        <th class="sm:tw-hidden tw-py-4">Title</th>
                        <th class="sm:tw-hidden tw-py-4">Author</th>
                        <th class="md:tw-hidden tw-py-4">Journal</th>
                        <th class="sm:tw-hidden">Category</th>
                        <th class="sm:tw-hidden">Year</th>
                        {/* <th>Actions</th> */}
                        {/* <th scope="col"></th> */}
                    </tr>
                </thead>

                <tbody class="tw-divide-y tw-divide-gray-300 tw-bg-gray-100">
                    {currentPost.map((d, i) => (
                        <tr key={i}>
                            {/* <th class="sm:tw-hidden tw-whitespace-nowrap tw-py-4 tw-pl-4 tw-pr-3 tw-text-gray-900">{indexOfFirstPost + 1 + i}</th> */}
                            <td class="tw-break-words tw-text-left tw-text-wrap tw-pl-4 tw-pr-3 tw-text-gray-900 sm:tw-pl-6 sm:tw-pt-4">
                                {/* {d.title} */}
                                <Link to={`/pdfView/${d.destination}`} onClick={updStat}>
                                    {d.title}
                                </Link>
                                <dl class="md:tw-hidden">
                                    <dt class="tw-sr-only">Category</dt>
                                    <dd class="tw-pt-2">{d.category}</dd>
                                    <dt class="tw-sr-only">Year</dt>
                                    <dd>{d.year}</dd>
                                </dl>
                            </td>
                            <td class="sm:tw-hidden tw-whitespace-nowrap tw-py-4 tw-pl-4 tw-pr-3 tw-text-gray-900">{d.author}</td>
                            <td class="sm:tw-hidden tw-whitespace-nowrap tw-py-4 tw-pl-4 tw-pr-3 tw-text-gray-900">{d.category}</td>
                            <td class="sm:tw-hidden tw-whitespace-nowrap tw-py-4 tw-pl-4 tw-pr-3 tw-text-gray-900">{d.year}</td>
                            {/* <td class="tw-py-4  tw-pl-4 tw-pr-3 tw-justify-center">
                                <button class=" tw-bg-btn-blue tw-border-none tw-mr-2 tw-outline-none hover:tw-bg-dark-steel tw-duration-500 tw-rounded-md"
                                    onClick={() => updStat(d.destination, d.title)}>
                                    <i class="bi bi-eye-fill tw-text-xl tw-text-text-blue"></i>
                                </button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div class="tw-flex tw-justify-end tw-pt-5">
                <Pagination postsPerPage={postsPerPage} setPostsPerPage={setPostCount} totalPosts={data.length} paginate={paginate} sortType={sortingType} setSortType={sorting} />
            </div>
        </div>
    )
}