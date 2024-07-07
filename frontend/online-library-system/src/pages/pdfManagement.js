import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import Searchbar from "../components/searchbar"
import WarningModal from "../components/warningModal"

export default function PDFManagement() {
    const [warningVisible, setWarningVisible] = useState(false);
    const [titleFile, setTitleFile] = useState("");
    const [deleteBtnEvent, setDeleteBtnEvent] = useState(null);

    const [primaryData, setPrimary] = useState([]);
    const [data, setData] = useState([]);
    const [pdfStats, setPdfStats] = useState([]);
    const [deleted, setDelete] = useState();
    const [edited, setEdit] = useState();

    useEffect(() => {

        fetch('http://localhost:8081/all-categ', {
            method: "get",
            headers: {
                "ngrok-skip-browser-warning": "89420",
            },
        })
            .then(res => res.json())
            .then(data => {
                const edited = data.map((item) => ({ ...item, state: false }));
                const edited2 = data.map((item) => ({ ...item, state: false }));
                setData(edited);

                setPrimary(edited2);
            }
            )
            .catch(err => console.log(err));
    }, [deleted, edited]);

    useEffect(() => {
        fetch('http://localhost:8081/pdf-statistics', {
            method: "get",
        })
            .then(res => res.json())
            .then(data => setPdfStats(data))
            .catch(err => console.log(err));
    }, [deleted, edited]);

    const editButton = () => {
        const editData = data.map((d) =>
            ({ ...d }))

        setData(editData);

    };

    const editValue = (e, index) => {

        const editData = data.map((item, i) =>
            i === index ? { ...item, [e.target.name]: e.target.value } : item
        );

        setData(editData);
    };

    const deleteButton = (e, title) => {
        e.preventDefault();
        fetch('http://localhost:8081/delete-pdf', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title })
        })
            .then(res => res.json())
            .then(data => alert(data.status))
            .catch(err => console.log(err));

        setDelete(true);

    };

    const openDeleteWarningModal = () => {
        setWarningVisible(true);
    }
    const closeDeleteWarningModal = () => {
        setWarningVisible(false);
    }
    const confirmDeleteWarningModal = () => {
        deleteButton(deleteBtnEvent, titleFile)
    }

    const doneButton = (e, d) => {
        e.preventDefault();
        var isTrue = false;

        primaryData.forEach((item) => {

            if (JSON.stringify(item) === JSON.stringify(d)) {

                isTrue = true;
            }
        })

        if (isTrue) {
            editButton();
            return;
        }
        fetch('http://localhost:8081/edit-pdf', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: d })
        })
            .then(res => res.json())
            .then(data => alert(data.status))
            .catch(err => console.log(err));
        setEdit(true);

        editButton();

    }

    return (
        <>
            <WarningModal
                visible={warningVisible}
                titleFile={titleFile}
                onConfirmDelete={confirmDeleteWarningModal}
                onClose={closeDeleteWarningModal}
            />

            <div class="tw-flex tw-bg-gray-50">
                <div>
                    <Sidebar />
                </div>

                <div class="tw-flex md:tw-mx-20 md:tw-mt-[100px] sm:tw-m-5 tw-align-top tw-flex-col">
                    <div>
                        <Searchbar />
                    </div>

                    <div class="table-striped table-responsive md:tw-w-full sm:tw-w-full tw-flex tw-items-center tw-flex-col">
                        <table class="table table-striped tw-text-center">
                            <thead class="tw-text-center">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Year Published</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((d, i) => (

                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td class="tw-break-words tw-text-left tw-text-wrap tw-pl-4 tw-pr-3 tw-text-gray-900 sm:tw-pl-6 sm:tw-pt-4">{d.state
                                            ? <input value={d.title} name="title" onChange={(e) => { editValue(e, i) }} class="tw-rounded-md tw-w-full tw-h-[40px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-px-3 focus:tw-shadow-lg
                                                focus:tw-duration-500 focus:tw-placeholder-transparent"></input>
                                            : <>{d.title}</>}</td>
                                        <td>{d.state
                                            ? <input value={d.author} name="author" onChange={(e) => { editValue(e, i) }} class="tw-rounded-md tw-w-full tw-h-[40px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-px-3 focus:tw-shadow-lg
                                                focus:tw-duration-500 focus:tw-placeholder-transparent"></input>
                                            : <>{d.author}</>}</td>
                                        <td>{d.state
                                            ? <select name="category" value={d.category} onChange={(e) => { editValue(e, i) }} class="tw-rounded-md tw-w-full tw-h-[40px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-px-3 focus:tw-shadow-lg
                                                focus:tw-duration-500 focus:tw-placeholder-transparent">
                                                <option value="Mathematics">Mathematics</option>
                                                <option value="Life Science">Life Science</option>
                                                <option value="Robotics">Robotics</option>
                                                <option value="Social Science">Social Science</option>
                                                <option value="Physical Science">Physical Science</option>
                                            </select>
                                            : <>{d.category}</>}</td>
                                        <td>{d.state
                                            ? <input value={d.year} name="year" onChange={(e) => { editValue(e, i) }} class="tw-rounded-md tw-w-full tw-h-[40px] tw-border-none tw-outline-none tw-ring-1 tw-ring-gray-300 focus:tw-ring-gray-500 focus:tw-ring-1 tw-p-3 focus:tw-shadow-lg
                                                focus:tw-duration-500 focus:tw-placeholder-transparent"></input>
                                            : <>{d.year}</>}</td>
                                        <td class="tw-w-[30px]">{d.state
                                            ? <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-100"
                                                onClick={(e) => { d.state = false; doneButton(e, d) }}>
                                                <label class="tw-cursor-pointer tw-text-gray-100">Done</label></button>
                                            : <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-100"
                                                onClick={() => { d.state = true; editButton(d) }}>
                                                <label class="tw-cursor-pointer tw-text-gray-100">Edit</label></button>
                                        }</td>
                                        <td class="tw-w-[30px]">
                                            <button class="tw-bg-dark-blue tw-rounded-md tw-h-[40px] tw-px-4 tw-w-full tw-border-none tw-outline-none hover:tw-bg-light-steel tw-duration-100"
                                                onClick={
                                                    // (e) => deleteButton(e, d.title)
                                                    (e) => {
                                                        openDeleteWarningModal()
                                                        setTitleFile(d.title);
                                                        setDeleteBtnEvent(e);
                                                    }
                                                }>
                                                <label class="tw-cursor-pointer tw-text-gray-100">Delete</label></button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}