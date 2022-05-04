import { ConfigConstant, LanguageConstant } from '../constants';
import {
  AcceptLanguageResolver,
  I18nOptions,
  QueryResolver,
} from 'nestjs-i18n';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigConstant.LANGUAGE, (): I18nOptions => {
  return {
    fallbackLanguage: LanguageConstant.en,
    loaderOptions: {
      path: 'dist/i18n/',
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ],
  };
});
