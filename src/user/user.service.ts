import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  register(createUserDto: CreateUserDto): User {
    const newUser = { id: this.idCounter++, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  login(loginUserDto: LoginUserDto): User | null {
    return this.users.find(
      user => user.username === loginUserDto.username && user.password === loginUserDto.password
    );
  }
}
