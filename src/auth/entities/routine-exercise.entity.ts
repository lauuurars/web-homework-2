import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from './routine.entity';
import { Exercise } from './exercise.entity';
import { ActivityExercise } from './activity-exercise.entity';

@Entity('routine_exercises')
export class RoutineExercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'order_index', type: 'int', default: 1 })
    orderIndex!: number;

    @Column({ name: 'target_sets', type: 'int', default: 0 })
    targetSets!: number;

    @Column({ name: 'target_reps', type: 'int', default: 0 })
    targetReps!: number;

    @Column({ name: 'target_weight_kg', type: 'float', default: 0 })
    targetWeightKg!: number;

    @Column({ name: 'target_duration_min', type: 'int', default: 0 })
    targetDurationMin!: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => Routine, (routine) => routine.routineExercises, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @ManyToOne(() => Exercise, (exercise) => exercise.routineExercises, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'exercise_id' })
    exercise!: Exercise;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.routineExercise)
    activityExercises!: ActivityExercise[];
}
