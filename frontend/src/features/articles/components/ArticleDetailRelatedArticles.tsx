import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../hooks/useAppSelector";
import {allArticles, getAllPosts} from "../articlesSlice";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {PostEntity} from "../../../types/articlesTypes";
import {useTruncatedString} from "../../../hooks/useTruncatedString";
import "../articles.scss";
import {useNavigate} from "react-router-dom";

type Props = {
    excludeId: number
};

const ArticleDetailRelatedArticles = ({excludeId}: Props) => {
    const postData = useAppSelector(allArticles)
    const [preparedPostData, setPreparedPostData] = useState<Array<PostEntity>>(undefined)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {
        if (!postData || !excludeId) return
        setPreparedPostData(
            postData.filter(post => post.id !== excludeId).slice(0, 4)
        )
    }, [postData, excludeId])

    const handleClick = (id: number) => () => {
        navigate(`/post/${id}`)
    }

    return (
        <div className={"relatedArticlesContainer"}>
            <h3>Related Articles</h3>
            {preparedPostData && preparedPostData.map((post) => {
                return (
                    <div className={"relatedArticlesPost"} onClick={handleClick(post.id)}>
                        <h4>{post.title}</h4>
                        <div>{useTruncatedString(post.content, 100, true)}</div>
                    </div>
                    )
            })}
        </div>
    );
};

export default ArticleDetailRelatedArticles;
