import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {Posts} from "./posts.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PostInput} from "../graphql";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/getAllPosts')
    getAllPosts(): Promise<Array<Posts>> {
        return this.postsService.findAllPosts()
    }

    @Get('/:id')
    getPost(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postsService.findOnePost(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() body: {authorId: number, postInput: PostInput}) {
        return this.postsService.createPost(body.authorId, body.postInput)
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    updatePost(
        @Param("id", ParseIntPipe) id: number,
        @Body() postInput: PostInput
    ) {
        return this.postsService.updatePost(id, postInput)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deletePost(@Param("id", ParseIntPipe) id: number) {
        return this.postsService.removePost(id)
    }
}
