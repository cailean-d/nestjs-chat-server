import { Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ProfileGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: FastifyRequest & { user: any } = context.switchToHttp().getRequest();
    return request.user.id.toHexString() === request.params.id;
  }
}
