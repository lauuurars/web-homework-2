import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityLog } from '../../auth/entities/activity-log.entity';
import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
    ) {}

    async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, startedAt, completedAt } = createActivityLogDto;

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        let routine: Routine | null = null;
        if (routineId) {
            routine = await this.routineRepository.findOne({
                where: { id: routineId },
            });
            if (!routine) {
                throw new NotFoundException(`Rutina con ID ${routineId} no encontrada`);
            }
        }

        const activityLog = this.activityLogRepository.create({
            startedAt: startedAt ? new Date(startedAt) : undefined,
            completedAt: completedAt ? new Date(completedAt) : undefined,
            user,
            routine: routine ?? undefined,
        });

        return await this.activityLogRepository.save(activityLog);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            relations: {
                user: true,
                routine: true,
                activityExercises: {
                    routineExercise: {
                        exercise: true,
                    },
                },
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: { id },
            relations: {
                user: true,
                routine: true,
                activityExercises: {
                    routineExercise: {
                        exercise: true,
                    },
                },
            },
        });

        if (!activityLog) {
            throw new NotFoundException(`Registro de actividad con ID ${id} no encontrado`);
        }

        return activityLog;
    }

    async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
        const activityLog = await this.findOne(id);
        const { userId, routineId, startedAt, completedAt } = updateActivityLogDto;

        if (userId) {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
            }
            activityLog.user = user;
        }

        if (routineId !== undefined) {
            if (routineId === null) {
                activityLog.routine = null as unknown as Routine;
            } else {
                const routine = await this.routineRepository.findOne({
                    where: { id: routineId },
                });
                if (!routine) {
                    throw new NotFoundException(`Rutina con ID ${routineId} no encontrada`);
                }
                activityLog.routine = routine;
            }
        }

        if (startedAt !== undefined) {
            activityLog.startedAt = new Date(startedAt);
        }

        if (completedAt !== undefined) {
            activityLog.completedAt = new Date(completedAt);
        }

        return await this.activityLogRepository.save(activityLog);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.activityLogRepository.delete(id);
        return { id };
    }
}
