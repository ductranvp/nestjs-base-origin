import { registerAs } from '@nestjs/config';
import { ConfigConstant } from '../constants';
import { getString } from '../common/utils';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export default registerAs(ConfigConstant.CORS, (): CorsOptions => {
  const allowedOrigins = getString(process.env.ALLOWED_ORIGINS).split(';');
  return {
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not permitted by CORS policy.`));
      }
    },
    credentials: true,
    preflightContinue: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  };
});
