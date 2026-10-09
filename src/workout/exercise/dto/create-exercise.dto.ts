import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateExerciseDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del ejercicio es requerido' })
    name!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El tipo de ejercicio es requerido' })
    type!: string;

    @IsNumber({}, { message: 'Las calorías estimadas deben ser un número' })
    @Min(0, { message: 'Las calorías estimadas no pueden ser negativas' })
    @IsOptional()
    estimatedCalories?: number;

    @IsNumber({}, { message: 'La distancia estimada debe ser un número' })
    @Min(0, { message: 'La distancia estimada no puede ser negativa' })
    @IsOptional()
    estimatedDistanceKm?: number;

    @IsInt({ message: 'La duración estimada debe ser un número entero' })
    @Min(0, { message: 'La duración estimada no puede ser negativa' })
    @IsOptional()
    estimatedDurationMin?: number;

    @IsString({ message: 'El icono debe ser una cadena de texto' })
    @IsOptional()
    icon?: string;
}
