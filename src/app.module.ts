import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtAuthService } from './user/jwt-auth/jwt-auth.service';
import { User, UserSchema } from './user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logger/logging.interceptor';

const db_url = process.env.DB_URL
  ? process.env.DB_URL
  : 'mongodb+srv://karim:karim@eg-task-db.cpmuygl.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot(db_url),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtAuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
