import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import {
  LoginInput,
  LoginResponse,
  SignupInput,
  SignupResponse,
} from 'src/graphql';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Mutation('signup')
  signupUser(
    @Args('signupInput')
    signupInput: SignupInput,
  ): Promise<SignupResponse> {
    return this.userService.create(signupInput);
  }

  @Query('login')
  loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }
}
