import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {PostsService} from "./posts.service";
import {UseGuards} from "@nestjs/common";
import {GqlJwtAuthGuard} from "../auth/jwt-auth.guard";
import {PostInput} from "../graphql";

@Resolver("Posts")
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Query()
    getAllPosts() {
        return this.postsService.findAllPosts()
    }

    @Query()
    getPost(@Args("id") id: number) {
        return this.postsService.findOnePost(id)
    }

    @Mutation()
    @UseGuards(GqlJwtAuthGuard)
    createPost(
        @Args("authorId") authorId: number,
        @Args("postInput") postInput: PostInput
    ) {
        return this.postsService.createPost(authorId, postInput)
    }

    @Mutation()
    @UseGuards(GqlJwtAuthGuard)
    updatePost(
        @Args("postInput") postInput: PostInput,
        @Args("id") id: number
    ) {
        return this.postsService.updatePost(id, postInput)
    }

    @Mutation()
    @UseGuards(GqlJwtAuthGuard)
    deletePost(@Args("id") id: number) {
        return this.postsService.removePost(id)
    }
}
