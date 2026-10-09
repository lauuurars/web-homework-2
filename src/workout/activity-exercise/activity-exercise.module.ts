import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityExercise } from '../../auth/entities/activity-exercise.entity';
import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';

import { ActivityExerciseController } from './activity-exercise.controller';
import { ActivityExerciseService } from './activity-exercise.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityExercise, ActivityLog, RoutineExercise])],
    controllers: [ActivityExerciseController],
    providers: [ActivityExerciseService],
    exports: [ActivityExerciseService],
})
export class ActivityExerciseModule {}
