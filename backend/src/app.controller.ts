import {Controller, Post, UseGuards, Request, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtRefreshGuard} from "./auth/jwt-auth.guard";
import {Response} from "express";
import * as CryptoJS from 'crypto-js';
import {jwtConstants} from "./auth/constants";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private authService: AuthService
  ) {}

  @Post('auth/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie("refreshToken", {httpOnly: true})
    return {status: 1};
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(req.user)
    res.cookie("refreshToken", CryptoJS.AES.encrypt(refreshToken, jwtConstants.cookieEncryptionSecret).toString(), {httpOnly: true})
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('auth/refresh')
  async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(req.user)
    res.cookie("refreshToken", CryptoJS.AES.encrypt(refreshToken, jwtConstants.cookieEncryptionSecret).toString(), {httpOnly: true})
    return this.authService.login(req.user);
  }
}
