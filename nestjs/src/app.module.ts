import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './feature/user/user.module';
import { ClassModule } from './feature/class/class.module';
import { AuthModule } from './feature/auth/auth.module';
import { AdminModule } from './feature/admin/admin.module';
import dbConfig from './config/db.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './feature/auth/guards/jwt-auth.guard';
import { RoleGuard } from './feature/auth/guards/role.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    DatabaseModule,
    UserModule,
    ClassModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
