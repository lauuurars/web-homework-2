import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from '../../auth/entities/exercise.entity';
import { Routine } from '../../auth/entities/routine.entity';
import { RoutineExercise } from '../../auth/entities/routine-exercise.entity';

import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(createRoutineExerciseDto: CreateRoutineExerciseDto): Promise<RoutineExercise> {
        const { routineId, exerciseId, ...data } = createRoutineExerciseDto;

        const routine = await this.routineRepository.findOne({
            where: { id: routineId },
        });
        if (!routine) {
            throw new NotFoundException(`Rutina con ID ${routineId} no encontrada`);
        }

        const exercise = await this.exerciseRepository.findOne({
            where: { id: exerciseId },
        });
        if (!exercise) {
            throw new NotFoundException(`Ejercicio con ID ${exerciseId} no encontrado`);
        }

        const routineExercise = this.routineExerciseRepository.create({
            ...data,
            routine,
            exercise,
        });

        return await this.routineExerciseRepository.save(routineExercise);
    }

    async findAll(): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            relations: {
                routine: true,
                exercise: true,
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: { id },
            relations: {
                routine: true,
                exercise: true,
            },
        });

        if (!routineExercise) {
            throw new NotFoundException(`Detalle de ejercicio en rutina con ID ${id} no encontrado`);
        }

        return routineExercise;
    }

    async update(id: number, updateRoutineExerciseDto: UpdateRoutineExerciseDto): Promise<RoutineExercise> {
        const routineExercise = await this.findOne(id);
        const { routineId, exerciseId, ...data } = updateRoutineExerciseDto;

        if (routineId) {
            const routine = await this.routineRepository.findOne({
                where: { id: routineId },
            });
            if (!routine) {
                throw new NotFoundException(`Rutina con ID ${routineId} no encontrada`);
            }
            routineExercise.routine = routine;
        }

        if (exerciseId) {
            const exercise = await this.exerciseRepository.findOne({
                where: { id: exerciseId },
            });
            if (!exercise) {
                throw new NotFoundException(`Ejercicio con ID ${exerciseId} no encontrado`);
            }
            routineExercise.exercise = exercise;
        }

        Object.assign(routineExercise, data);
        return await this.routineExerciseRepository.save(routineExercise);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.routineExerciseRepository.delete(id);
        return { id };
    }
}
