import { Controller, Get, Post, Body, Delete, Param, Put, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { updateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';
import { User } from './entity/user.entity';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mahasiswa/:nim/upload')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor(`file`))
  async uploadMahasiswaFoto(@UploadedFile() file: Express.Multer.File, @Param('nim') nim: string) {
    if (!file) throw new BadRequestException('File tidak boleh kosong');
    return this.appService.uploadMahasiswaFoto(file, nim);
  }

  @Get('mahasiswa/:nim/foto')
  async getMahasiswaFoto(@Param('nim') nim: string, @Res() res: Response) {
    const filename = await this.appService.getMahasiwaFoto(nim);
    return res.sendFile(filename, { root: 'uploads' });
  }
  @Get('mahasiswa/search')
  async searchMahasiswa(
    // @Query('nama')nama?:string,
    @Param('nim')nim? : string
  ){
    return this.appService.searchMahasiswa(nim)
  }

  @Post('register')
  @ApiBody({
    type: RegisterUserDTO
  })
  register(@Body() data: RegisterUserDTO) {
    return this.appService.register(data);
  }

  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User) {
    return user;
  }

  @Post('login')
  @ApiBody({
    type: LoginUserDTO
  })
  login(@Body() data: LoginUserDTO) {
    return this.appService.login(data);
  }

  @Post('mahasiswa')
  @ApiBody({ type: CreateMahasiswaDto })
  createMahasiswa(@Body() data: CreateMahasiswaDto) {
    return this.appService.addMahasiswa(data);
  }

  @Delete('mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  @Put('mahasiswa/:nim')
  @ApiBody({ type: updateMahasiswaDto })
  editMahasiswa(@Param('nim') nim: string, @Body() data: updateMahasiswaDto) {
  return this.appService.updateMahasiswa(nim, data);
  }

  @Get('mahasiswa')
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }

  @Get('mahasiswa/:nim')
  getMahasiswaByNim(@Param('nim') nim: string) {
    return this.appService.getMahasiswaByNIM(nim);
  }
}