import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt({ message: 'El ID del usuario debe ser un número entero' })
    @IsPositive({ message: 'El ID del usuario debe ser positivo' })
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    userId!: number;

    @IsInt({ message: 'El ID de la rutina debe ser un número entero' })
    @IsPositive({ message: 'El ID de la rutina debe ser positivo' })
    @IsOptional()
    routineId?: number;

    @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida (ISO 8601)' })
    @IsOptional()
    startedAt?: string;

    @IsDateString({}, { message: 'La fecha de finalización debe ser una fecha válida (ISO 8601)' })
    @IsOptional()
    completedAt?: string;
}
