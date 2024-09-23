import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAthleteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsInt()
  age: number;
}
