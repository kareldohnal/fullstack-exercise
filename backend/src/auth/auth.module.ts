import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {jwtConstants} from "./constants";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {JwtStrategyRefresh} from "./jwt-refresh.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtStrategyRefresh],
    exports: [AuthService],
})
export class AuthModule {}
