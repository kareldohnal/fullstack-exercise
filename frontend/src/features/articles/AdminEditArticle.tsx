import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Layout from "../wrappers/Layout";
import MDEditor from '@uiw/react-md-editor';
import "./articles.scss";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {createPost, updatePost} from "./articlesSlice";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {userId} from "../login/userSlice";
import axios from "../../config/axios";

type Props = {
    createNewMode?: boolean
};

// The component is susceptible to loss of data during refresh. I was planning to address the issue, but didn't due to lack of time.
// 1. Save all changes to REDUX to prepared "selectedArticle" property.
// 2. Periodically save property to localStorage with timestamp.
// 3. On refresh load from localStorage if timestamp is newer that one minute.
const AdminEditArticle = ({createNewMode = false}: Props) => {
    const [content, setContent] = useState<string>(undefined)
    const [title, setTitle] = useState<string>("")
    const [image, setImage] = useState<string | ArrayBuffer>(undefined)
    const fileRef = useRef(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const authorId = useAppSelector(userId)
    const {id} = useParams()

    useEffect(() => {
        if (createNewMode || !id) return
        axios.get(`/posts/${id}`)
            .then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setContent(response.data.content)
                response.data.thumbnail && setImage(response.data.thumbnail)
            })
            .catch((error) => {
                console.log("Response error:", error)
            })
    }, [createNewMode, id])

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setImage(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handlePublish = async () => {
        if (title === "" || !content) {
            alert("Article Title and Content must be filled out.")
            return
        }
        if (createNewMode) {
            await dispatch(createPost({authorId, postInput: {title, content, thumbnail: image as string}}))
        } else {
            await dispatch(updatePost({id: Number(id), postInput: {title, content, thumbnail: image as string}}))
        }

        navigate("/admin")
    }

    const handleDeleteImage = () => {
        fileRef.current.value = ""
        setImage(undefined)
    }

    return (
        <Layout>
            <div className={"editArticleHeading"}>
                <h1>
                    {createNewMode ? "Create new article" : "Edit article"}
                </h1>
                <button onClick={handlePublish}>
                    Publish Article
                </button>
            </div>
            <div className={"editArticleBlock"}>
                <h6>
                    Article Title
                </h6>
                <input type={"text"} id={"title"} onChange={handleTitleChange} value={title}/>
            </div>
            <div className={"editArticleBlock"}>
                <h6>
                    Featured image
                </h6>
                {image
                    ? (
                        <>
                            <img src={image as string} className={"imagePreview"} alt={"image preview"}/>
                            <div className={"uploadControls"}>
                                <label htmlFor={"image"} className={"full"}>
                                    Upload an Image
                                </label>
                                <div className={"pipe"}>|</div>
                                <div className={"delete"} onClick={handleDeleteImage}>Delete</div>
                            </div>
                        </>
                    )
                    : (
                        <label htmlFor={"image"} className={"empty"}>
                            Upload an Image
                        </label>
                    )}
                <input type={"file"} accept="image/png, image/jpeg" id={"image"} onChange={handleImageChange}  ref={fileRef}/>
            </div>
            <div className={"editArticleBlock"} data-color-mode="light">
                <h6>
                    Content
                </h6>
                <MDEditor
                    value={content}
                    onChange={setContent}
                    preview={"edit"}
                    hideToolbar={true}
                    textareaProps={{
                        placeholder: "Supports markdown. Yay!"
                    }}
                />
            </div>
        </Layout>
    );
};

export default AdminEditArticle;
