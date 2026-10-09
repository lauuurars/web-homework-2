import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt({ message: 'El ID del registro de actividad debe ser un número entero' })
    @IsPositive({ message: 'El ID del registro de actividad debe ser positivo' })
    @IsNotEmpty({ message: 'El ID del registro de actividad es requerido' })
    activityLogId!: number;

    @IsInt({ message: 'El ID del ejercicio de rutina debe ser un número entero' })
    @IsPositive({ message: 'El ID del ejercicio de rutina debe ser positivo' })
    @IsOptional()
    routineExerciseId?: number;

    @IsInt({ message: 'Las series realizadas deben ser un número entero' })
    @Min(0, { message: 'Las series realizadas no pueden ser negativas' })
    @IsOptional()
    actualSets?: number;

    @IsInt({ message: 'Las repeticiones realizadas deben ser un número entero' })
    @Min(0, { message: 'Las repeticiones realizadas no pueden ser negativas' })
    @IsOptional()
    actualReps?: number;

    @IsNumber({}, { message: 'El peso utilizado debe ser un número' })
    @Min(0, { message: 'El peso utilizado no puede ser negativo' })
    @IsOptional()
    actualWeightKg?: number;

    @IsInt({ message: 'La duración real debe ser un número entero' })
    @Min(0, { message: 'La duración real no puede ser negativa' })
    @IsOptional()
    actualDurationMin?: number;

    @IsNumber({}, { message: 'Las calorías quemadas deben ser un número' })
    @Min(0, { message: 'Las calorías quemadas no pueden ser negativas' })
    @IsOptional()
    caloriesBurned?: number;

    @IsNumber({}, { message: 'La distancia recorrida debe ser un número' })
    @Min(0, { message: 'La distancia recorrida no puede ser negativa' })
    @IsOptional()
    distanceCoveredKm?: number;

    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (ISO 8601)' })
    @IsOptional()
    startedAt?: string;

    @IsDateString({}, { message: 'La fecha de finalización debe ser una fecha válida (ISO 8601)' })
    @IsOptional()
    completedAt?: string;
}
