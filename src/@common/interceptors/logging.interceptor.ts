import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, url, body, params, query } = req;

    this.logger.log(`➡️ Request: ${method} ${url}`);
    this.logger.log(`📝 Body: ${JSON.stringify(body)}`);
    this.logger.log(`🔍 Params: ${JSON.stringify(params)}`);
    this.logger.log(`📌 Query: ${JSON.stringify(query)}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - now;
        this.logger.log(`✅ Response: ${method} ${url} - ${duration}ms`);
        this.logger.log(`📤 Result: ${JSON.stringify(response)}`);
      }),
      catchError((error: Error) => {
        const duration = Date.now() - now;
        this.logger.error(`❌ Error in ${method} ${url} - ${duration}ms`);
        this.logger.error(`🛑 Message: ${error.message}`);
        this.logger.error(`🚨 Stack: ${error.stack}`);

        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        return throwError(
          () =>
            new InternalServerErrorException(
              'Ocurrió un error inesperado, por favor inténtelo más tarde.',
            ),
        );
      }),
    );
  }
}
