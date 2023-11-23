import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const timestamp = new Date().toLocaleString();
    console.log(
      `[${timestamp}] Request: ${request.method} ${request.url} Email:${request.body.email}`,
    );

    return next.handle().pipe(
      tap(() => {
        console.log(
          `[${timestamp}] Response: ${request.method} ${request.url}  Email:${request.body.email}`,
        );
      }),
    );
  }
}
