import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const passwordOk = await bcrypt.compare(pass, user.password)
        if (user && passwordOk) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id, displayName: user.displayName};
        return {
            access_token: this.jwtService.sign(payload, {expiresIn: "5m"}),
            id: payload.sub,
            username: payload.email,
            displayName: payload.displayName
        };
    }

    async generateRefreshToken(user: any) {
        const payload = {email: user.email, sub: user.id, displayName: user.displayName};
        return this.jwtService.sign(payload, {expiresIn: "30d"});
    }
}
