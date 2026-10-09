import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateRoutineDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la rutina es requerido' })
    name!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @IsInt({ message: 'El ID de usuario debe ser un número entero' })
    @IsPositive({ message: 'El ID de usuario debe ser positivo' })
    @IsNotEmpty({ message: 'El ID de usuario es requerido' })
    userId!: number;
}
