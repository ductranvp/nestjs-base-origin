import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ConfigConstant } from '../../../constants';
import { IAwsConfig } from '../../media/interfaces/IAwsConfig';
import { IFile } from '../../media/interfaces/IFile';

@Injectable()
export class AwsS3Service implements OnApplicationBootstrap {
  public readonly _s3: S3;
  private readonly logger = new Logger(AwsS3Service.name);
  private s3Config: IAwsConfig;

  constructor(public configService: ConfigService) {
    const awsS3Config = configService.get(ConfigConstant.AWS_S3) as IAwsConfig;
    const options: S3.Types.ClientConfiguration = {
      sslEnabled: false,
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
      endpoint: awsS3Config.apiEndpoint,
    };

    if (
      awsS3Config.credentials.accessKeyId &&
      awsS3Config.credentials.secretAccessKey
    ) {
      options.credentials = awsS3Config.credentials;
    }

    this.s3Config = awsS3Config;
    this._s3 = new S3(options);
  }

  onApplicationBootstrap(): any {
    const bucketName = this.s3Config.bucketName;

    this._s3.createBucket(
      {
        Bucket: bucketName,
        ACL: 'public-read',
        CreateBucketConfiguration: {
          LocationConstraint: '',
        },
      },
      (error, data) => {
        if (error) {
          this.logger.warn(
            `Bucket ${bucketName} has been created already`,
            error,
          );
        } else {
          this.logger.log(`Bucket ${bucketName} is created successfully`);
        }
      },
    );
  }

  async putObject({ key, file }: { key: string; file: IFile }) {
    await this._s3
      .putObject({
        Bucket: this.s3Config.bucketName,
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();
    return key;
  }

  deleteObject(key) {
    this._s3.deleteObject(
      {
        Bucket: this.s3Config.bucketName,
        Key: key,
      },
      (error) => {
        this.logger.error({ error });
      },
    );
  }

  getBucketAlc() {
    return new Promise((resolve, reject) => {
      this._s3.getBucketAcl(
        {
          Bucket: this.s3Config.bucketName,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
