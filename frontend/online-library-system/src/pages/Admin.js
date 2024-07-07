import { useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

export default function Admin() {

    const [researchTitle, setTitle] = useState("");
    const [researchAuthor, setAuthor] = useState("");
    const [researchYear, setYear] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState("");

    const inputRef = useRef(null);

    const submitFile= async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", researchTitle);
        formData.append("Author", researchAuthor);
        formData.append("Year", researchYear);
        formData.append("Category", category);
        formData.append("File", file);
        
        console.log(researchTitle, researchAuthor, researchYear, category, file);

        const uploadAPI = await axios.post("http://localhost:8081/upload-pdf", formData, {
            headers: { "Content-type" : "multipart/form-data",
        },
            
        });
        alert(uploadAPI.data.status);
        setTitle("");
        setAuthor("");
        setYear("");
        setCategory("");
        inputRef.current.value = null;
    }

    return(
        <>
        <div class="tw-flex tw-min-h-dvh tw-min-w-full tw-bg-gray-100">
            <Sidebar />

            <div class="tw-mx-auto tw-my-auto tw-bg-white tw-rounded-lg tw-shadow-lg">
                <form class="formStyle sm:tw-w-full tw-p-5 md:tw-w-[500px]" onSubmit={submitFile}>
                    <div class="form-group">
                        <div class="mb-3 row">
                            <label for="titleInput" class="col-sm-2 col-form-label">Title</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="titleInput" placeholder="Title" required
                                onChange={(e) => setTitle(e.target.value)} value={researchTitle}/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="mb-3 row">
                            <label for="titleInput" class="col-sm-2 col-form-label">Author</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="authorInput" placeholder="Author" required
                                onChange={(e) => setAuthor(e.target.value)} value={researchAuthor}/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="mb-3 row">
                            <label for="yearInput" class="col-sm-2 col-form-label">Year</label>
                            <div class="col-sm-10">
                                <input type='text' className='form-control' placeholder='Input here' id='yearInput' required
                                onChange={(e) => setYear(e.target.value)} value={researchYear}/>
                            </div>
                        </div>
                    </div>
                    
                    <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-lg-2 pt-0 ">Category</legend>
                        <div class="col-sm-10" onChange={(e) => setCategory(e.target.value)} >
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="lsCateg" value="Life Science" required
                                checked={category === 'Life Science'}/>
                                <label class="form-check-label" for="lsCateg">
                                Life Science
                                </label>
                            </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="psCateg" value="Physical Science" required
                            checked={category === 'Physical Science'}/>
                            <label class="form-check-label" for="psCateg">
                            Physical Science
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="ssCateg" value="Social Science" required
                            checked={category === 'Social Science'}/>
                            <label class="form-check-label" for="ssCateg">
                            Social Science
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="mathCateg" value="Mathematics" required
                            checked={category === 'Mathematics'}/>
                            <label class="form-check-label" for="mathCateg">
                            Mathematics
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="robCateg" value="Robotics" required
                            checked={category === 'Robotics'}/>
                            <label class="form-check-label" for="robCateg">
                            Robotics
                            </label>
                        </div>

                        </div>
                    </div>
                    </fieldset>

                    <br/>

                    <div class="form-group">
                        <div class="mb-3">
                        <input  ref={inputRef} type='file' className='form-control' accept='application/pdf' required
                    onChange={(e) => setFile(e.target.files[0])} /> 
                        </div>
                    </div>
                    
                    <button type="submit" class="tw-bg-green tw-rounded-md tw-h-[40px] tw-px-6 tw-border-none tw-outline-none hover:tw-bg-dark-green tw-duration-500 tw-text-white">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}