import React, {useEffect} from 'react';
import Layout from "../wrappers/Layout";
import {useAppSelector} from "../../hooks/useAppSelector";
import {allArticles, getAllPosts} from "./articlesSlice";
import ArticlePreview from "./components/ArticlePreview";
import {useAppDispatch} from "../../hooks/useAppDispatch";

type Props = {};

const RecentArticlesPage = ({}: Props) => {
    const postData = useAppSelector(allArticles)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return (
        <Layout>
            <div className={"recentArticlesContainer"}>
                <h1>
                    Recent Articles
                </h1>
                {postData && postData.map((post) => {
                    return (
                        <ArticlePreview key={post.id} {...{post}} />
                    )
                })}
            </div>
        </Layout>
    );
};

export default RecentArticlesPage;
