# Backend
- 
## Notes
- I've made a choice to save thumbnail images as base64 string directly into a database due to lack of time. I would not to that in real life. For an exercise this simple I would chosen separate table and save images as byte array, in large-scale apps I would probably chosen S3 or something similar.
- There is a huge amount of room for proper error handling. Pick one or tho methods to demostrate.

## To Start:
- `docker compose -f docker-compose.yml --env-file=.postgres.env build`
- `docker compose -f docker-compose.yml --env-file=.postgres.env up`

### Before moving into production we would need to:
- Remove `synchronize` property in `TypeOrmModule.forRoot` in app.module.ts
- Change JWT secret in `./auth/constants.ts` to use something that was not part of source code
- Change cookie secret in main.ts
- Change cookie secret in `./auth/constants.ts`
