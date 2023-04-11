import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Posts} from "../posts/posts.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    displayName: string;

    @Column()
    password: string;

    @OneToMany(() => Posts, (post) => post.author, {onDelete: "CASCADE"})
    posts: Posts[]
}
