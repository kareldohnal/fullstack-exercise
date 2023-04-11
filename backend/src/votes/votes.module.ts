import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comments} from "../comments/comments.entity";
import {Votes} from "./votes.entity";
import {VotesService} from "./votes.service";
import {VotesResolver} from "./votes.resolver";
import {VotesController} from "./votes.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Votes, Comments])],
    providers: [VotesService, VotesResolver],
    controllers: [VotesController],
    exports: [VotesService],
})
export class VotesModule {}
