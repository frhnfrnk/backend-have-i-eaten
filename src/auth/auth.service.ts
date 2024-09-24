// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findByUsername(username);
    if (admin && (await bcrypt.compare(pass, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      premiumUntil: user.premiumUntil,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginAdmin(admin: any) {
    const payload = {
      username: admin.username,
      sub: admin.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
