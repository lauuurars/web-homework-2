import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RoutineExercise } from './routine-exercise.entity';

@Entity('exercises')
export class Exercise {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ length: 50 })
    type!: string;

    @Column({ name: 'estimated_calories', type: 'float', default: 0 })
    estimatedCalories!: number;

    @Column({ name: 'estimated_distance_km', type: 'float', default: 0 })
    estimatedDistanceKm!: number;

    @Column({ name: 'estimated_duration_min', type: 'int', default: 0 })
    estimatedDurationMin!: number;

    @Column({ length: 255, nullable: true })
    icon!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.exercise)
    routineExercises!: RoutineExercise[];
}
