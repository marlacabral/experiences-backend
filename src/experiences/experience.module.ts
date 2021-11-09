import { Module } from '@nestjs/common';
import { ExperiencesService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ExperiencesService, PrismaService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
