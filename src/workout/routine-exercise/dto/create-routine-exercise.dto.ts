import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsInt({ message: 'El ID de la rutina debe ser un número entero' })
    @IsPositive({ message: 'El ID de la rutina debe ser positivo' })
    @IsNotEmpty({ message: 'El ID de la rutina es requerido' })
    routineId!: number;

    @IsInt({ message: 'El ID del ejercicio debe ser un número entero' })
    @IsPositive({ message: 'El ID del ejercicio debe ser positivo' })
    @IsNotEmpty({ message: 'El ID del ejercicio es requerido' })
    exerciseId!: number;

    @IsInt({ message: 'El índice de orden debe ser un número entero' })
    @Min(1, { message: 'El índice de orden debe ser mayor o igual a 1' })
    @IsOptional()
    orderIndex?: number;

    @IsInt({ message: 'Las series objetivo deben ser un número entero' })
    @Min(0, { message: 'Las series objetivo no pueden ser negativas' })
    @IsOptional()
    targetSets?: number;

    @IsInt({ message: 'Las repeticiones objetivo deben ser un número entero' })
    @Min(0, { message: 'Las repeticiones objetivo no pueden ser negativas' })
    @IsOptional()
    targetReps?: number;

    @IsNumber({}, { message: 'El peso objetivo debe ser un número' })
    @Min(0, { message: 'El peso objetivo no puede ser negativo' })
    @IsOptional()
    targetWeightKg?: number;

    @IsInt({ message: 'La duración objetivo debe ser un número entero' })
    @Min(0, { message: 'La duración objetivo no puede ser negativa' })
    @IsOptional()
    targetDurationMin?: number;
}
