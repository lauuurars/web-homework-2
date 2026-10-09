import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from './activity-log.entity';
import { RoutineExercise } from './routine-exercise.entity';

@Entity('activity_exercises')
export class ActivityExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'actual_sets', type: 'int', default: 0 })
    actualSets!: number;

    @Column({ name: 'actual_reps', type: 'int', default: 0 })
    actualReps!: number;

    @Column({ name: 'actual_weight_kg', type: 'float', default: 0 })
    actualWeightKg!: number;

    @Column({ name: 'actual_duration_min', type: 'int', default: 0 })
    actualDurationMin!: number;

    @Column({ name: 'calories_burned', type: 'float', default: 0 })
    caloriesBurned!: number;

    @Column({ name: 'distance_covered_km', type: 'float', default: 0 })
    distanceCoveredKm!: number;

    @Column({ name: 'started_at', type: 'timestamp', nullable: true })
    startedAt!: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date;

    @ManyToOne(() => ActivityLog, (activityLog) => activityLog.activityExercises, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'activity_log_id' })
    activityLog!: ActivityLog;

    @ManyToOne(() => RoutineExercise, (routineExercise) => routineExercise.activityExercises, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'routine_exercise_id' })
    routineExercise!: RoutineExercise;
}
