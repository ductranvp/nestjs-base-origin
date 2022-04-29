import { QueueOptions } from 'bull';
import { registerAs } from '@nestjs/config';
import { ConfigConstant } from '../../constants';
import { getNumber, getString } from '../utils';

export default registerAs(ConfigConstant.QUEUE, (): QueueOptions => {
  return {
    redis: {
      host: getString(process.env.QUEUE_HOST),
      port: getNumber(process.env.QUEUE_PORT),
    },
  };
});
