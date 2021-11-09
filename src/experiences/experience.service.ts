import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Experience, User } from '@prisma/client';

@Injectable()
export class ExperiencesService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.ExperienceCreateInput): Promise<Experience> {
    const experience = await this.db.experience.create({ data });
    return experience;
  }

  async findMany(): Promise<Experience[]> {
    const experiences = await this.db.experience.findMany();
    return experiences;
  }

  async findUnique(id: string): Promise<Experience> {
    const experience = await this.db.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException('ID Não encontrado na base de dados');
    }

    return experience;
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.experience.delete({
      where: { id },
    });

    return {
      message: 'Item deletado com sucesso',
    };
  }

  async likeExperience(userId: string, experienceId: string): Promise<User> {
    await this.db.user.update({
      where: { id: userId },
      data: {
        experiences: {
          connect: {
            id: experienceId,
          },
        },
      },
    });

    return this.db.user.findUnique({
      where: { id: userId },
      include: {
        experiences: true,
      },
    });
  }
}
