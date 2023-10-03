import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthStrategy } from './auth/auth-strategy';
import { UserModule } from './user/user.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import config from './common/configs/config';
import { FirebaseAuthListenerService } from './firebase/firebase-auth-listener.service';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'debug',
          }),
        ],
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthStrategy],
})
export class AppModule {}
