import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigins = ['*'];

export const corsConfig: CorsOptions = {
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
