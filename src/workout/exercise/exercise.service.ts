import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Exercise } from '../../auth/entities/exercise.entity';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        const exercise = this.exerciseRepository.create(createExerciseDto);
        return await this.exerciseRepository.save(exercise);
    }

    async findAll(): Promise<Exercise[]> {
        return await this.exerciseRepository.find({
            order: {
                id: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOne({
            where: { id },
        });

        if (!exercise) {
            throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
        }

        return exercise;
    }

    async update(id: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
        await this.findOne(id);
        await this.exerciseRepository.update(id, updateExerciseDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<{ message: string; id: number }> {
        await this.findOne(id);
        await this.exerciseRepository.delete(id);
        return {
            message: `Ejercicio con ID ${id} eliminado exitosamente`,
            id,
        };
    }
}
