import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
