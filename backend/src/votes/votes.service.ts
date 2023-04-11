import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Comments} from "../comments/comments.entity";
import {Votes} from "./votes.entity";
import {ResponseStatusWithIP} from "../graphql";
import {RESPONSE_STATUS_COMMENT_NOT_EXIST} from "../app-types";

export class VotesService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
        @InjectRepository(Votes)
        private votesRepository: Repository<Votes>,
    ) {}

    async voteOnComment(id: number, ip: string, effect: boolean): Promise<ResponseStatusWithIP> {
        const comment = await this.commentsRepository.findOneBy({id})
        if (!comment) {
            return RESPONSE_STATUS_COMMENT_NOT_EXIST
        }

        const dbInput = {commentRef: comment, effect, ip}

        const votesWithSameIp = await this.votesRepository.find({where: {ip}, relations: {commentRef: true}})
        const voteWithSameIpAndId = votesWithSameIp.find(vote => vote.commentRef.id)
        if (voteWithSameIpAndId) {
            if (voteWithSameIpAndId.effect === effect) {
                await this.votesRepository.delete(voteWithSameIpAndId.id)
                return { status: 1, message: "Vote has been updated.", ip}
            } else {
                await this.votesRepository.update({id: voteWithSameIpAndId.id}, {effect})
                return { status: 1, message: "Vote has been updated.", ip}
            }
        }

        await this.votesRepository.save(dbInput)
        return { status: 1, message: "Vote has been counted.", ip}
    }
}
