import { IsNotEmpty, IsUrl, IsString } from 'class-validator';
export class CreateExperienceDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  place: string;

  @IsString()
  experience: string;

  @IsString()
  description: string;

  @IsString()
  option: string;

  @IsString()
  provider: string;

  @IsString()
  where: string;

  @IsString()
  hour: string;

  @IsString()
  people: string;

  @IsUrl()
  image: string;
}
