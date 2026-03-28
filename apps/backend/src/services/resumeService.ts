import { PrismaClient } from '@prisma/client';

export class ResumeService {
  private prisma = new PrismaClient();

  async list(userId: number) {
    return this.prisma.resumeDraft.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async create(userId: number, input: any) {
    const { title, resumeJson } = input;
    return this.prisma.resumeDraft.create({
      data: {
        userId,
        title: title || 'Untitled Resume',
        resumeJson: JSON.stringify(resumeJson || {}),
      },
    });
  }

  async update(id: number, userId: number, input: any) {
    const { title, resumeJson } = input;
    return this.prisma.resumeDraft.update({
      where: { id, userId },
      data: {
        title,
        resumeJson: JSON.stringify(resumeJson || {}),
      },
    });
  }

  async findById(id: number, userId: number) {
    return this.prisma.resumeDraft.findFirst({
      where: { id, userId },
    });
  }

  async delete(id: number, userId: number) {
    return this.prisma.resumeDraft.delete({
      where: { id, userId },
    });
  }
}
