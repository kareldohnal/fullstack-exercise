import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comments} from "./comments.entity";
import {CommentsService} from "./comments.service";
import {CommentsResolver} from "./comments.resolver";
import {CommentsController} from "./comments.controller";
import {Posts} from "../posts/posts.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comments, Posts])],
    providers: [CommentsService, CommentsResolver],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}
