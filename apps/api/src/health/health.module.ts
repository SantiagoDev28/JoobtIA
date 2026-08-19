import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { PrismaModule } from '../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 1. Importas Prisma para que HealthService pueda usarlo
  controllers: [HealthController], // 2. Registras el controlador
  providers: [HealthService], // 3. Registras el servicio
})
export class HealthModule {}
