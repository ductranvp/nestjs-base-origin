import { Injectable, Logger } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private readonly admin: firebase.app.App;
  constructor() {
    try {
      const firebaseConfig = JSON.parse(
        fs.readFileSync('credentials/firebase-admin.json', 'utf-8'),
      );
      this.admin = firebase.initializeApp({
        credential: firebase.credential.cert(firebaseConfig as any),
      });
      this.logger.log('Firebase admin initialized');
    } catch (e) {
      this.logger.error(`credentials/firebase-admin.json not found`, e);
      return;
    }
  }

  async subscribeTopic(token: string, topic: string) {
    const result = await this.admin.messaging().subscribeToTopic(token, topic);
    return result;
  }

  async unSubscribeTopic(token: string, topic: string) {
    const result = await this.admin
      .messaging()
      .unsubscribeFromTopic(token, topic);
    return result;
  }

  async sendMessage(payload: firebase.messaging.Message) {
    const result = await this.admin.messaging().send(payload);
    return result;
  }
}
