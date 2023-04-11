import {Controller, Get, Param} from "@nestjs/common";
import {UsersService} from "./users.service";
import {User} from "./users.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':email')
    findByEmail(@Param('email') email: string): Promise<User> {
        return this.usersService.findByEmail(email)
    }

}
