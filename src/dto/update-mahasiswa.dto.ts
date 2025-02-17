import { ApiProperty } from '@nestjs/swagger';
import { Jenis_Kelamin } from '@prisma/client';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';

export class updateMahasiswaDto {
  @ApiProperty({
    description: 'NIM mahasiswa',
    type: 'string',
    example: '105841105222',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  nim: string;

  @ApiProperty({
    description: 'Nama mahasiswa',
    type: 'string',
    example: `Mar'atul Azizah`,
  })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    description: 'Kelas mahasiswa',
    type: 'string',
    example: '5B',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  kelas: string;

  @ApiProperty({
    description: 'Jurusan mahasiswa',
    type: 'string',
    example: 'Informatika',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 12)
  jurusan: string;

  @ApiProperty({
    description: 'Jenis Kelamin',
    enum: Jenis_Kelamin,
    example: 'P',
  })
  @IsEnum(Jenis_Kelamin)
  jenis_kelamin: Jenis_Kelamin;
  foto_profile: any;
}