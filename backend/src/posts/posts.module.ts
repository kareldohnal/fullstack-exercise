import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Posts} from "./posts.entity";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";
import {PostsResolver} from "./posts.resolver";
import {User} from "../users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Posts, User])],
    providers: [PostsService, PostsResolver],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {}
