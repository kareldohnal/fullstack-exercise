import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.seedDatabase();
    }

    findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy( {email})
    }
    async seedDatabase() {
        if ((await this.usersRepository.count()) === 0) {
            let userSeed = {email: "karel@test.cz", password: "karel123", displayName: "Karel Dohnal"}
                userSeed.password = await bcrypt.hash(userSeed.password, 12);
                await this.usersRepository.save(userSeed);
        }
    }
}
