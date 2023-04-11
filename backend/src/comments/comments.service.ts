import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Comments} from "./comments.entity";
import {CommentInput, ResponseStatus} from "../graphql";
import {Posts} from "../posts/posts.entity";

export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) {}

    async createComment(id: number, commentInput: CommentInput): Promise<ResponseStatus> {
        const post = await this.postsRepository.findOneBy({id})
        const dbInput = {postRef: post, timestampCreated: new Date, ...commentInput}
        await this.commentsRepository.save(dbInput)
        return { status: 1 }
    }
}
