import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userDTO: CreateUserDTO): Promise<User> {
    // const salt = await bcrypt.genSalt();
    // userDTO.password = await bcrypt.hash(userDTO.password, salt);

    // const user = await this.userRepository.save(userDTO);
    // delete user.password;
    // return user;

    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);

    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: loginDTO.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id: id });
  }

  async updateSecretKey(
    userId: number,
    twoFASecret: string,
  ): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: twoFASecret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }
}
