import { ConfigConstant, LanguageConstant } from '../../constants';
import * as path from 'path';
import { AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { I18nOptions } from 'nestjs-i18n/dist/interfaces/i18n-options.interface';
import { registerAs } from '@nestjs/config';

export default registerAs(ConfigConstant.LANGUAGE, (): I18nOptions => {
  return {
    fallbackLanguage: LanguageConstant.en,
    loaderOptions: {
      path: path.join(__dirname, '/../../i18n/'),
      watch: true,
    },
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
    ],
  };
});
