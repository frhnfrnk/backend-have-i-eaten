// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AdminService } from '../admin/admin.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.phoneNumber,
      createUserDto.password,
    );
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      return 'Invalid credentials';
    }
    return this.authService.login(user);
  }

  @Post('admin/login')
  async loginAdmin(@Body() loginDto: any) {
    const admin = await this.authService.validateAdmin(
      loginDto.usename,
      loginDto.password,
    );
    if (!admin) {
      return 'Invalid credentials';
    }
    return this.authService.loginAdmin(admin);
  }

  @Post('admin/register')
  async registerAdmin(@Body() createUserDto: any) {
    const admin = await this.adminService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
    return this.authService.loginAdmin(admin);
  }
}
