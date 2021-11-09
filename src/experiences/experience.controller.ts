import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Experience } from '@prisma/client';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { ExperiencesService } from './experience.service';
import { UserRole } from 'src/users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from '@prisma/client';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('experience')
export class ExperienceController {
  constructor(private service: ExperiencesService) {}

  // Um usuário ADMIN logado pode criar um filme
  @Post('create')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createExperience(@Body() data: CreateExperienceDto): Promise<Experience> {
    return this.service.create(data);
  }

  // Qualquer usuário logado pode listar os filmes
  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany(): Promise<Experience[]> {
    return this.service.findMany();
  }

  // Qualquer usuário logado pode listar um filme pelo seu ID
  @Get('find/:id')
  @UseGuards(AuthGuard())
  findUnique(@Param('id') id: string): Promise<Experience> {
    return this.service.findUnique(id);
  }

  // Um usuário ADMIN logado pode deletar um filme
  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }

  // Usuário logado pode curtir um filme
  @Get('like/:id')
  @UseGuards(AuthGuard())
  likeExperience(
    @AuthUser() user: User,
    @Param('id') experienceId: string,
  ): Promise<User> {
    const userId = user.id;
    return this.service.likeExperience(userId, experienceId);
  }
}
