import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private JwtService: JwtService){}

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies['token'];
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // if(!request.headers.authorization) return []
    //Bearer sdfsdfsdfsdfsdfsdfsdf
    //[type: Bearer, token: sfsdfsdfsdfsdf]
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromCookies(request);
      // const token = this.extractTokenFromHeader(request);
      if(!token) throw new UnauthorizedException('Unauthorized')
      const payload = await this.JwtService.verify(token, { secret: 'jwt-secret' });
      request.user = payload;
    } catch (error) {
      throw error;
    }
    return true;
  }
}
