import React from 'react';
import {PostEntity} from "../../../types/articlesTypes";
import "../articles.scss"

type Props = {
    post: PostEntity
};

const ArticleDetailComments = ({post}: Props) => {
    return (
        <div className={"articleDetailCommentsContainer"}>
            <h3>{`Comments (${post.comments.length})`}</h3>
            <div>
                Comment section implementation skipped due to lack of time.
                Please, see comment inside the code.
                {/*
                Comment section is time consuming, especially due to the real-tim voting subtask.
                In the past, I have used Socket.io in several small apps, the most complicated one was multiplayer card game.
                I don't have active knowledge of the library, but I feel confident that couple hours with the docs would put think in place.
                */}
            </div>
        </div>
    );
}
    ;

    export default ArticleDetailComments;
