import React, {useEffect, useState} from 'react';
import Layout from "../wrappers/Layout";
import {useParams} from "react-router-dom";
import axios from "../../config/axios";
import ArticleDetailComments from "./components/ArticleDetailComments";
import ArticleDetailRelatedArticles from "./components/ArticleDetailRelatedArticles";
import {useWindowSize} from "react-use";
import ReactMarkdown from 'react-markdown'
import "./articles.scss"

type Props = {};

const ArticleDetailPage = ({}: Props) => {
    const {id} = useParams()
    const [post, setPost] = useState(undefined)
    const {width} = useWindowSize();

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then((response) => {
                setPost(response.data)
            })
            .catch((error) => {
                console.log("Response error:", error)
            })
    }, [id])

    return (
        <Layout>
            {post &&
              <div className={"articleDetailContainer"}>
                <h1>{post.title}</h1>
                <div className={"meta"}>
                  <div>{post.author?.displayName}</div>
                  <div>•</div>
                  <div>{new Date(post.timestampCreated).toLocaleDateString("cs")}</div>
                </div>
                <div className={"articleDetailThumbnail"}
                     style={{backgroundImage: `url(${post.thumbnail ? post.thumbnail : "/assets/images/placeholder.png"})`,}}/>
                <div className={"articleDetailContent"}><ReactMarkdown>{post.content}</ReactMarkdown></div>
                <ArticleDetailComments {...{post}} />
                  {width > 1160 && <ArticleDetailRelatedArticles/>}
              </div>
            }
        </Layout>
    );
};

export default ArticleDetailPage;
