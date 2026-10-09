import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Routine } from '../../auth/entities/routine.entity';
import { User } from '../../auth/entities/user.entity';

import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
        const { userId, ...routineData } = createRoutineDto;

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        const routine = this.routineRepository.create({
            ...routineData,
            user,
        });

        return await this.routineRepository.save(routine);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find({
            relations: {
                user: true,
                routineExercises: {
                    exercise: true,
                },
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
            relations: {
                user: true,
                routineExercises: {
                    exercise: true,
                },
            },
        });

        if (!routine) {
            throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
        }

        return routine;
    }

    async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<Routine> {
        const routine = await this.findOne(id);
        const { userId, ...routineData } = updateRoutineDto;

        if (userId) {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });

            if (!user) {
                throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
            }

            routine.user = user;
        }

        Object.assign(routine, routineData);
        return await this.routineRepository.save(routine);
    }

    async remove(id: number): Promise<{ message: string; id: number }> {
        await this.findOne(id);
        await this.routineRepository.delete(id);
        return {
            message: `Rutina con ID ${id} eliminada exitosamente`,
            id,
        };
    }
}
