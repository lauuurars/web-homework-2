import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityExercise } from '../../auth/entities/activity-exercise.entity';
import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';

import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
    ) {}

    async create(createActivityExerciseDto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, startedAt, completedAt, ...data } = createActivityExerciseDto;

        const activityLog = await this.activityLogRepository.findOne({
            where: { id: activityLogId },
        });
        if (!activityLog) {
            throw new NotFoundException(`Registro de actividad con ID ${activityLogId} no encontrado`);
        }

        let routineExercise: RoutineExercise | null = null;
        if (routineExerciseId) {
            routineExercise = await this.routineExerciseRepository.findOne({
                where: { id: routineExerciseId },
            });
            if (!routineExercise) {
                throw new NotFoundException(`Detalle de ejercicio en rutina con ID ${routineExerciseId} no encontrado`);
            }
        }

        const activityExercise = this.activityExerciseRepository.create({
            ...data,
            activityLog,
            routineExercise: routineExercise ?? undefined,
            startedAt: startedAt ? new Date(startedAt) : undefined,
            completedAt: completedAt ? new Date(completedAt) : undefined,
        });

        return await this.activityExerciseRepository.save(activityExercise);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({
            relations: {
                activityLog: true,
                routineExercise: {
                    exercise: true,
                    routine: true,
                },
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOne({
            where: { id },
            relations: {
                activityLog: true,
                routineExercise: {
                    exercise: true,
                    routine: true,
                },
            },
        });

        if (!activityExercise) {
            throw new NotFoundException(`Detalle de ejercicio de actividad con ID ${id} no encontrado`);
        }

        return activityExercise;
    }

    async update(id: number, updateActivityExerciseDto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        const activityExercise = await this.findOne(id);
        const { activityLogId, routineExerciseId, startedAt, completedAt, ...data } = updateActivityExerciseDto;

        if (activityLogId) {
            const activityLog = await this.activityLogRepository.findOne({
                where: { id: activityLogId },
            });
            if (!activityLog) {
                throw new NotFoundException(`Registro de actividad con ID ${activityLogId} no encontrado`);
            }
            activityExercise.activityLog = activityLog;
        }

        if (routineExerciseId !== undefined) {
            if (routineExerciseId === null) {
                activityExercise.routineExercise = null as unknown as RoutineExercise;
            } else {
                const routineExercise = await this.routineExerciseRepository.findOne({
                    where: { id: routineExerciseId },
                });
                if (!routineExercise) {
                    throw new NotFoundException(
                        `Detalle de ejercicio en rutina con ID ${routineExerciseId} no encontrado`,
                    );
                }
                activityExercise.routineExercise = routineExercise;
            }
        }

        if (startedAt !== undefined) {
            activityExercise.startedAt = new Date(startedAt);
        }

        if (completedAt !== undefined) {
            activityExercise.completedAt = new Date(completedAt);
        }

        Object.assign(activityExercise, data);
        return await this.activityExerciseRepository.save(activityExercise);
    }

    async remove(id: number): Promise<{ message: string; id: number }> {
        await this.findOne(id);
        await this.activityExerciseRepository.delete(id);
        return {
            message: `Detalle de ejercicio de actividad con ID ${id} eliminado exitosamente`,
            id,
        };
    }
}
