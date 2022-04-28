import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable, UseInterceptors } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { LanguageConstant } from '../constants';
import { ContextProvider } from '../providers';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<undefined> {
    const request = context.switchToHttp().getRequest();
    const language: LanguageConstant = request.headers['x-language-code'];

    if (LanguageConstant[language]) {
      ContextProvider.setLanguage(language);
    }

    return next.handle();
  }
}

export function UseLanguageInterceptor() {
  return UseInterceptors(LanguageInterceptor);
}
