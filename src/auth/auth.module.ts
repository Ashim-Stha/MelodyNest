import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constant';
import { JwtStrategy } from './jwt.strategy';
import { ApiKeyStrategy } from './apiKey.strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ArtistsModule,
    // JwtModule.register({
    //   secret: authConstants.secret,
    //   signOptions: {
    //     expiresIn: '1d',
    //   },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
