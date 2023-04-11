import {Body, Controller, Ip, Post} from "@nestjs/common";
import {VotesService} from "./votes.service";

@Controller("votes")
export class VotesController {
    constructor(private readonly votesService: VotesService) {}

    @Post()
    createPost(
        @Body() body: { commentId: number, effect: boolean },
        @Ip() ip,
    ) {
        return this.votesService.voteOnComment(body.commentId, ip, body.effect)
    }
}
