import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Comments} from "../comments/comments.entity";
import {User} from "../users/users.entity";

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({type: "timestamptz", default: new Date})
    timestampCreated: Date;

    @Column({type: "timestamptz", default: new Date})
    timestampEdited: Date;

    @Column({nullable: true})
    thumbnail: string //https://wanago.io/2021/11/01/api-nestjs-storing-files-postgresql-database/

    @OneToMany(() => Comments, (comment) => comment.postRef, {onDelete: "CASCADE"})
    comments: Comments[]

    @ManyToOne(() => User, (user) => user.posts)
    author: User
}
