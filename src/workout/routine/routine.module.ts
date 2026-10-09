import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';

@Module({
    imports: [TypeOrmModule.forFeature([Routine, User])],
    controllers: [RoutineController],
    providers: [RoutineService],
    exports: [RoutineService],
})
export class RoutineModule {}
