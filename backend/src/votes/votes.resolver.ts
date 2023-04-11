import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {VotesService} from "./votes.service";
import {IpAddressGql} from "./votes.decorator";

@Resolver("Votes")
export class VotesResolver {
    constructor(
        private readonly votesService: VotesService
    ) {}

    @Mutation()
    voteOnComment(
        @Args("commentId") commentId: number,
        @Args("effect") effect: boolean,
        @IpAddressGql() ipAddress: string,
    ) {
        return this.votesService.voteOnComment(commentId, ipAddress, effect)
    }
}
