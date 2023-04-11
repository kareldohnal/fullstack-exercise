import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Posts} from "./posts.entity";
import {ResponseStatus} from "../graphql";
import {PostInput} from "../graphql";
import {User} from "../users/users.entity";

export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAllPosts(): Promise<Posts[]> {
        return this.postsRepository.find({relations: {comments: true, author: true}});
    }

    findOnePost(id: number): Promise<Posts> {
        return this.postsRepository.findOne({where: {id}, relations: {comments: {votes: true}, author: true}});
    }

    async removePost(id: number): Promise<ResponseStatus> {
        await this.postsRepository.delete(id);
        return {status: 1}
    }

    async createPost(authorId: number, postInput: PostInput) {
        const author = await this.usersRepository.findOneBy({id: authorId})
        const dbInput = {author, ...postInput}
        console.log("dbipuuuut", dbInput, postInput)
        await this.postsRepository.save(dbInput)
        return { status: 1 }
    }

    async updatePost(id: number, postInput: PostInput): Promise<ResponseStatus> {
        const postInputWithUpdateTimestamp = {timestampEdited: new Date, ...postInput}
        await this.postsRepository.update({id}, {...postInputWithUpdateTimestamp})
        return {status: 1}
    }
}
