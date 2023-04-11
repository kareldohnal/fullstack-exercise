import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request as RequestType } from 'express';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: JwtStrategyRefresh.extractJWT,
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, displayName: payload.displayName };
    }

    private static extractJWT(req: RequestType): string | null {
        if (req.cookies && 'refreshToken' in req.cookies) {
            return CryptoJS.AES.decrypt(req.cookies.refreshToken, jwtConstants.cookieEncryptionSecret).toString(CryptoJS.enc.Utf8);
        }
        return null;
    }
}
