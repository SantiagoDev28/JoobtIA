import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'up',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: 'down',
        database: 'disconnected',
      });
    }
  }
}