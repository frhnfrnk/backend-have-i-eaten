// src/auth/premium.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class PremiumGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { premiumUntil: string };
    console.log(user.premiumUntil);
    if (user && user.premiumUntil && new Date(user.premiumUntil) > new Date()) {
      return true;
    }
    return false;
  }
}
