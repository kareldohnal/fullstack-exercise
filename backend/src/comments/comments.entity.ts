import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Votes} from "../votes/votes.entity";
import {Posts} from "../posts/posts.entity";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    content: string;

    @Column({type: "timestamptz", default: new Date})
    timestampCreated: Date;

    @ManyToOne(() => Posts, (post) => post.comments)
    postRef: Posts

    @OneToMany(() => Votes, (vote) => vote.commentRef, {onDelete: "CASCADE"})
    votes: Votes[]
}
