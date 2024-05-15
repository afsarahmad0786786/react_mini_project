import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './style.scss'
import uploadIcon from '../../assets/images/Upload.svg'
import arrowLeft from "../../assets/images/Arrow_Left.svg";
import arrowRight from "../../assets/images/Arrow_Right.svg";
import deleteIcon from "../../assets/images/Delete.svg";
import { useGlobalContext } from "../../context/context";
import axios from "axios";


const FirstPage = () => {
    const [state, setState] = useGlobalContext();
    const { register, handleSubmit, formState, watch } = useForm({
        defaultValues: state,
        mode: "onSubmit",
    });
    const { errors } = formState;
    const [selectedFile, setSelectedFile] = useState(
        state?.scriptFileName ? state?.scriptFileName : null
    );
    const [uploadedFilePath, setUploadedFilePath] = useState(
        state?.scriptFile ? state?.scriptFile : null
    );
    const fileUploadRef = useRef(null);
    const [selectedFileError, setSelectedFileError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [prevBtnDisabled] = useState(true);
    const navigate = useNavigate();

    const getFileExtension = (filename) => {
        return filename.slice(filename.lastIndexOf("."));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedExtensions = [".html", ".htm", ".rtf", ".txt"];
        const fileExtension = getFileExtension(file.name);
        if (!allowedExtensions.includes(fileExtension)) {
            setSelectedFileError("Only .html, .rtf and .txt files are allowed.");
            return;
        }

        setSelectedFileError("");
        setSelectedFile(file);
        setIsUploading(true);
        const formData = new FormData();
        formData.append("files", file);
        axios
            .post(`${import.meta.env.VITE_BASE_URL}/onboard/2/data`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                setIsUploading(false);
                setUploadedFilePath(res.data.paths[0]);
            })
            .catch((err) => {
                console.log("some error occured.", err);
            });
    };

    const removeFile = () => {
        const body = {
            link:
                Array.isArray(uploadedFilePath) === true
                    ? uploadedFilePath[0]
                    : uploadedFilePath,
        };

        axios
            .delete(`${import.meta.env.VITE_BASE_URL}/onboard/2/deleteFile`, {
                data: body,
            })
            .then((res) => {
                console.log("File deleted successfully!", res);
                setSelectedFile(null);
                setUploadedFilePath(null);
                setSelectedFileError("");
                setState({ ...state, scriptFile: null, scriptFileName: null });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const saveData = (data) => {
        if (uploadedFilePath !== null && selectedFile?.name) {
            setState({
                ...state,
                ...data,
                scriptFile: [uploadedFilePath],
                scriptFileName: selectedFile.name,
            });
        } else if (
            uploadedFilePath !== null &&
            selectedFile &&
            !selectedFile?.name
        ) {
            setState({
                ...state,
                ...data,
                scriptFile: uploadedFilePath,
                scriptFileName: selectedFile,
            });
        } else {
            setState({ ...state, ...data, scriptFile: null, scriptFileName: null });
        }
        console.log(state);
        navigate("/second-page");
    };

    return (
        <>
            <div className="form" >
                <form onSubmit={handleSubmit(saveData)} noValidate>
                    <p>
                        Does your contact center primarily handles inbound calls, outbound calls, or a combination of both?
                    </p>
                    <div className="answer-box">
                        <div
                            className={
                                watch("callType") === "inbound"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("callType", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="inbound"
                                id="inbound"
                            />

                            <label htmlFor="inbound">
                                Inbound
                            </label>
                        </div>
                        <div
                            className={
                                watch("callType") === "outbound"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("callType", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="outbound"
                                id="outbound"
                            />
                            <label htmlFor="outbound">
                                Outbound
                            </label>
                        </div>
                        <div
                            className={
                                watch("callType") === "both"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("callType", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="both"
                                id="both"
                            />
                            <label htmlFor="both">
                                Both
                            </label>
                        </div>
                    </div>
                    {<div className="error-msg">{errors?.callType?.message}</div>}
                    <p>
                        Does your contact center primarily focus on customer service, sales, or a blend of both?
                    </p>
                    <div className="answer-box">
                        <div
                            className={
                                watch("ccfocus") === "customerService"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("ccfocus", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="customerService"
                                id="customerService"
                            />

                            <label htmlFor="customerService">
                                Customer Service
                            </label>
                        </div>
                        <div
                            className={
                                watch("ccfocus") === "sales"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("ccfocus", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="sales"
                                id="sales"
                            />
                            <label htmlFor="sales">
                                Sales
                            </label>
                        </div>
                        <div
                            className={
                                watch("ccfocus") === "both"
                                    ? "radio-btn radio-btn-checked"
                                    : "radio-btn"
                            }
                        >
                            <input
                                {...register("ccfocus", {
                                    // required: "Please select your answer.",
                                })}
                                type="radio"
                                value="both"
                                id="both"
                            />
                            <label htmlFor="both">
                                Both
                            </label>
                        </div>

                    </div>
                    {<div className="error-msg">{errors?.ccfocus?.message}</div>}

                    <div className="">
                        <p>
                            If there is a specific greeting you prefer your agents to use on calls, provide the exact wording below:
                        </p>

                        <div className="greeting-answer">
                            <textarea className="specific-greeting" placeholder="ex: Hey (customer name), this is (agent name) calling on a recorded line from Coconut Mortgage!"
                                rows="2"
                                cols="50"
                                {...register("greeting")}
                                id="specific-greeting" />
                        </div>
                    </div>

                    <div className="question">
                        <p>
                            If you have a script integrated with Five9 that you would like to show your agents within CallMind, upload it below: (.html, .rtf, .txt)
                        </p>
                        <div
                            className="upload-div"
                            onClick={() => {
                                fileUploadRef.current.click();
                            }}
                        >
                            <img src={uploadIcon} />

                            <label htmlFor="upload">Upload</label>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="singleScriptUpload"
                        {...register("singleScriptUpload")}
                        hidden
                        ref={fileUploadRef}
                        onChange={handleFileChange}
                    />

                    {selectedFile && isUploading === false ? (
                        <>
                            <div className="file-upload-status-area">
                                <div className="filename">
                                    {" "}
                                    {typeof selectedFile === "string"
                                        ? selectedFile
                                        : selectedFile?.name}
                                </div>
                                <img
                                    src={deleteIcon}
                                    onClick={() => {
                                        removeFile();
                                    }}
                                />
                            </div>
                        </>
                    ) : selectedFile && isUploading === true ? (
                        <>
                            {" "}
                            <div className="file-upload-status-area">
                                <div className="filename">Uploading...</div>
                            </div>
                        </>
                    ) : null}

                    {selectedFileError !== "" ? (
                        <div className="single-file-upload-error">{selectedFileError}</div>
                    ) : null}


                    <div className="nav-btn-div">
                        <button
                            className={
                                prevBtnDisabled === true ? "nav-disabled-btn" : "nav-btn"
                            }
                        >
                            <img src={arrowLeft} />
                        </button>
                        <button className="nav-btn" type="submit">
                            <img src={arrowRight} />
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default FirstPage;