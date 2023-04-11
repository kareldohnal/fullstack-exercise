import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Comments} from "../comments/comments.entity";

@Entity()
export class Votes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    effect: boolean | null;

    @Column()
    ip: string;

    @ManyToOne(() => Comments, (comment) => comment.votes)
    commentRef: Comments
}
