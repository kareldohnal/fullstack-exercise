### Before moving into production we would need to:
- Remove `synchronize` property in `TypeOrmModule.forRoot` in app.module.ts
- Change JWT secret in `./auth/constants.ts` to use something that was not part of source code
- Change cookie secret in main.ts
