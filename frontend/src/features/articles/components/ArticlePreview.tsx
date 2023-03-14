import React from 'react';
import {PostEntity} from "../../../types/articlesTypes";
import {useTruncatedString} from "../../../hooks/useTruncatedString";
import {NavLink} from "react-router-dom";
import "../articles.scss"

type Props = {
  post: PostEntity
};

const ArticlePreview = ({post}: Props) => {
 return (
  <div className={"previewContainer"}>
      <div className={"thumbnail"} style={{backgroundImage: `url(${post.thumbnail ? post.thumbnail : "/assets/images/placeholder.png"})`,}} />
      <div className={"previewRight"}>
          <div className={"previewTitle"}>{post.title}</div>
          <div className={"previewMeta"}>
              <div>{post.author?.displayName}</div>
              <div>•</div>
              <div>{post.timestampCreated}</div>
          </div>
          <div className={"previewPerex"}>{useTruncatedString(post.content, 300, true)}</div>
          <div className={"previewInfo"}>
              <NavLink to={`/post/${post.id}`} className={"previewNavlink"} >Read whole article</NavLink>
              <div>{`${post.comments.length} comments`}</div>
          </div>
      </div>
  </div>
 );
};

export default ArticlePreview;
