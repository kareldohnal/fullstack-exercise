import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {CommentsService} from "./comments.service";
import {CommentInput} from "../graphql";

@Resolver("Comments")
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService
    ) {}

    @Mutation()
    createComment(
        @Args("postId") postId: number,
        @Args("commentInput") commentInput: CommentInput) {
        return this.commentsService.createComment(postId, commentInput)
    }
}
