import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization.startsWith('Bearer')) {
      throw new UnauthorizedException('You must send Bearer Token');
    }
    const token = request.headers?.['authorization']?.split(' ')?.[1] ?? '';
    if (!token) {
      throw new UnauthorizedException('Please login first');
    }
    try {
      request.user = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('use valid token');
    }
    return true;
  }
}
