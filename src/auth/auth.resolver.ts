import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import {
  LoginInput,
  LoginResponse,
  Profile,
  SignupInput,
  SignupResponse,
} from '../graphql';
import { resolve } from 'path';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './gql-auth-guard';

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

  @Query('profile')
  @UseGuards(GraphQLAuthGuard)
  getProfile(parent, args, contextValue, info): Promise<Profile> {
    console.log(parent, '.', args, '.', contextValue, '.', info);
    // return new Promise((resolve) => {
    //   return resolve({
    //     userId: '1',
    //     email: 'luffy@gmail.com',
    //   });
    // });
    return contextValue.req.user;
  }
}
