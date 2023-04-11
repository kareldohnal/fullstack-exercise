import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { join } from 'path';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {User} from "./users/users.entity";
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";
import {Posts} from "./posts/posts.entity";
import {Votes} from "./votes/votes.entity";
import {Comments} from "./comments/comments.entity";
import {PostsModule} from "./posts/posts.module";
import {CommentsModule} from "./comments/comments.module";
import {VotesModule} from "./votes/votes.module";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
            },
            cors: {
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true,
                origin: true,
            }
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgresDB',
            port: 5432,
            username: 'kareldohnal',
            password: 'pass',
            database: 'exercise',
            entities: [User, Posts, Votes, Comments],
            synchronize: true, // TODO: do not use in production
        }),
        UsersModule,
        AuthModule,
        PostsModule,
        CommentsModule,
        VotesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
