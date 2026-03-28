import { PrismaClient } from '@prisma/client';

export class ResumeService {
  private prisma = new PrismaClient();

  async list() {
    return [];
  }

  async create(input: any) {
    return { id: 1, ...input };
  }

  async update(id: number, input: any) {
    const payload = input?.resumeJson ?? input;
    return this.prisma.resumeDraft.upsert({
      where: { id: Number(id) },
      update: { resumeJson: payload },
      create: {
        userId: 1,
        resumeJson: payload,
      },
    });
  }
}
