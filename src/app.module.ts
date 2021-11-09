import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExperienceModule } from './experiences/experience.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ExperienceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
