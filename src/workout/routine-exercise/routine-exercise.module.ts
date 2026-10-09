import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from '../../auth/entities/exercise.entity';
import { Routine } from '../../auth/entities/routine.entity';
import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';

import { RoutineExerciseController } from './routine-exercise.controller';
import { RoutineExerciseService } from './routine-exercise.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineExercise, Routine, Exercise])],
    controllers: [RoutineExerciseController],
    providers: [RoutineExerciseService],
    exports: [RoutineExerciseService],
})
export class RoutineExerciseModule {}
