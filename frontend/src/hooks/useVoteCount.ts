import {VoteEntity} from "../types/articlesTypes";

export const useVoteCount = (votes: Array<VoteEntity>) => {
    let count = 0
    votes.forEach((vote) => {
        if (vote.effect) count += 1
        else count -= 1
    })
    return count > 0 ? `+${count}` : count
}
