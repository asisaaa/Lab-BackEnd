import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import prisma from './prisma';
import { RegisterUserDTO } from './dto/register-user.dto';
import { hash } from 'crypto';
import { compare, compareSync, hashSync } from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }
  async register(data: RegisterUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username
        }
      })
      if (user != null) {
        throw new BadRequestException("Username Sudah Ada")
      }
      const hash = hashSync(data.password, 10)
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hash,
          role: "USER"
        }
      })
      return newUser

    } catch (err) {
      throw new BadRequestException("Ada Masalah Pada Server")
    }
  }
  async auth(user_id : number) {
    try {
      const user = await prisma.user.findFirst({
        where : {
          id : user_id
        }
      })
      if(user == null) throw new NotFoundException("User Tidak Ditemukan")
        return user
      }catch(err) {
        if(err instanceof HttpException) throw err
        throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit")
      }
    }
    

  async login(data: LoginUserDTO) {
    try {
      // Validasi input
      if (!data.username || !data.password) {
        throw new BadRequestException("Username dan Password harus diisi");
      }
  
      // Cari user berdasarkan username
      const user = await prisma.user.findFirst({
        where: { username: data.username },
      });
  
      if (!user) {
        throw new BadRequestException("Username Tidak Ada");
      }
  
      // Validasi password
      const isPasswordValid = await compare(data.password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException("Password Salah");
      }
  
      // Buat payload untuk JWT
      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 jam
      };
  
      // Generate token
      const token = await this.jwtService.signAsync(payload);
  
      // Jangan log token di produksi!
      console.log("Token berhasil dibuat: ", token);
  
      return { token };
    } catch (err) {
      console.error("Error during login process: ", err);
      if (err instanceof HttpException) throw err;
      throw new InternalServerErrorException("Ada Masalah Pada Server");
    }
  }
  


  async getMahasiswa() {
    return await prisma.mahasiswa.findMany();
  }

  async getMahasiswaByNIM(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim
      }
    })

    if (mahasiswa == null)
      throw new NotFoundException("Tidak Menemukan NIM")

    return mahasiswa

  }

  async addMahasiswa(data: CreateMahasiswaDto) {
    await prisma.mahasiswa.create({
      data
    })

    return await prisma.mahasiswa.findMany()
  }

  async deleteMahasiswa(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim
      }
    })

    if (mahasiswa == null) {
      throw new NotFoundException("Tidak Menemukan NIM")
    }

    await prisma.mahasiswa.delete({
      where: {
        nim
      }
    })

    return await prisma.mahasiswa.findMany()
  }
  async putMahasiswa(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim
      }
    })

    if (mahasiswa == null) {
      throw new NotFoundException("Tidak Menemukan NIM")
    }

    await prisma.mahasiswa.delete({
      where: {
        nim
      }
    })

    return await prisma.mahasiswa.findMany()
  }
}
