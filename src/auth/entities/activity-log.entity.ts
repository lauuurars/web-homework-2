import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Routine } from './routine.entity';
import { ActivityExercise } from './activity-exercise.entity';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'started_at', type: 'timestamp', nullable: true })
    startedAt!: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.activityLogs, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Routine, (routine) => routine.activityLogs, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'routine_id' })
    routine!: Routine;

    @OneToMany(() => ActivityExercise, (activityExercise) => activityExercise.activityLog, { cascade: true })
    activityExercises!: ActivityExercise[];
}
