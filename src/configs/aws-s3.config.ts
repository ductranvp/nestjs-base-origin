import { registerAs } from '@nestjs/config';
import { ConfigConstant } from '../constants';
import { IAwsConfig } from '../modules/media/interfaces/IAwsConfig';

export default registerAs(ConfigConstant.AWS_S3, (): IAwsConfig => {
  return {
    apiEndpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
    bucketName: process.env.S3_BUCKET_NAME,
  };
});
