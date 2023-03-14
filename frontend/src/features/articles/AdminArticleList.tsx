import React, {ChangeEvent, useEffect, useState} from 'react';
import Layout from "../wrappers/Layout";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {allArticles, getAllPosts} from "./articlesSlice";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useNavigate} from "react-router-dom";
import "./articles.scss"
import axios from "../../config/axios";
import {access_token, silentRefresh} from "../login/userSlice";
import {useTruncatedString} from "../../hooks/useTruncatedString";

type Props = {};

const AdminArticleList = ({}: Props) => {
    const dispatch = useAppDispatch()
    const postData = useAppSelector(allArticles)
    const token = useAppSelector(access_token)
    const navigate = useNavigate()
    const [checked, setChecked] = useState<Array<number>>([])

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    const handleClickCreateNew = () => {
        navigate("/admin/create")
    }

    const handleCheckAll = () => {
        if (postData.every(post => checked.includes(post.id))) {
            setChecked([])
        } else {
            setChecked(postData.map(post => post.id))
        }
    }

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setChecked(prevState => [...prevState, Number(e.target.name)])
        } else {
            setChecked(checked.filter(id => id !== Number(e.target.name)))
        }
    }

    const handleEdit = (id: number) => () => {
        navigate(`/admin/edit/${id}`)
    }

    const handleDelete = (id: number) => async () => {
        // ideally before delete should be an confirm dialog, omitted due to lack of time
        await dispatch(silentRefresh())
        axios.delete(`/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then(() => {
                dispatch(getAllPosts())
            })
            .catch((error) => {
                console.log("Response error:", error)
            })
    }

    // Ideally I would make this table sortable:
    // 1. Make clickable items in thead, save "sorted by and asc/desc" value of ENUM to state and to localStorage
    // 2. Make copy of postData to state sorted by previously clicked, update on change using useEffect
    // 3. If no sort-by state is available, sort by id or timeCreated

    return (
        <Layout>
            <div className={"editArticleHeading"}>
                <h1>
                    My Articles
                </h1>
                <button onClick={handleClickCreateNew}>
                    Create new article
                </button>
            </div>
            {postData &&
              <table className={"table"}>
                <thead className={"tableHead"}>
                <tr>
                  <th>
                    <input type={"checkbox"} checked={postData.every(post => checked.includes(post.id))}
                           onChange={handleCheckAll}/>
                  </th>
                  <th>
                    Article title
                  </th>
                  <th>
                    Perex
                  </th>
                  <th>
                    Author
                  </th>
                  <th>
                    # of comments
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody>
                {postData && postData.map((post) => {
                    return (
                        <tr className={"tableRow"} key={post.id}>
                            <td>
                                <input type={"checkbox"} checked={checked.includes(post.id)} name={String(post.id)} onChange={handleCheck}/>
                            </td>
                            <td>
                                {post.title}
                            </td>
                            <td>
                                {useTruncatedString(post.content, 80, true)}
                            </td>
                            <td>
                                {post.author?.displayName}
                            </td>
                            <td>
                                {post.comments.length}
                            </td>
                            <td className={"actionColumn"}>
                                <img src={"/assets/images/icon_edit.png"} alt={"edit"} className={"actionIcon"} onClick={handleEdit(post.id)} />
                                <img src={"/assets/images/icon_delete.png"} alt={"delete"} className={"actionIcon"} onClick={handleDelete(post.id)} />
                            </td>
                        </tr>
                    )
                })}
                </tbody>
              </table>}
        </Layout>
    );
};

export default AdminArticleList;
