import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    const userToken = request.headers?.['authorization']?.split(' ')[1];
    const decodeToken = this.jwtService.verify(userToken);
    if (requiredRoles.indexOf(decodeToken.userRole) < 0) {
      throw new ForbiddenException('You are now allowed to access this action');
    }
    return true;
  }
}
