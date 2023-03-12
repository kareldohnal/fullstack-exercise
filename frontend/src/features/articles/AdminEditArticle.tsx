import React, {ChangeEvent, useRef, useState} from 'react';
import Layout from "../wrappers/Layout";
import MDEditor from '@uiw/react-md-editor';
import "./articles.scss";

type Props = {
    createNewMode?: boolean
};

const AdminEditArticle = ({createNewMode = false}: Props) => {
    const [content, setContent] = useState<string>(undefined)
    const [title, setTitle] = useState<string>(undefined)
    const [image, setImage] = useState<string | ArrayBuffer>(undefined)
    const fileRef = useRef(null)

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

    const handlePublish = () => {
        if (!title || !content) {
            alert("Article Title and Content must be filled out.")
            return
        }
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
