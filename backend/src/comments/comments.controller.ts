import {Body, Controller, Post} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {CommentInput} from "../graphql";

@Controller("comments")
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    createComment(
        @Body() body: { postId: number, commentInput: CommentInput }
    ) {
        return this.commentsService.createComment(body.postId, body.commentInput)
    }
}
