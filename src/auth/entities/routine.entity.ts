import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';
import { RoutineExercise } from './routine-exercise.entity';
import { ActivityLog } from './activity-log.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.routines, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToMany(() => RoutineExercise, (routineExercise) => routineExercise.routine, { cascade: true })
    routineExercises!: RoutineExercise[];

    @OneToMany(() => ActivityLog, (activityLog) => activityLog.routine)
    activityLogs!: ActivityLog[];
}
