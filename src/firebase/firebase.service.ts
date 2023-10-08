import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import * as functions from 'firebase-functions';
import { PrismaService } from 'nestjs-prisma';
import { FirebaseConfig } from 'src/common/configs/config.interface';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(
    readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  onModuleInit() {
    this.initializeFirebase();
    this.listenForNewUsers();
  }

  private async initializeFirebase() {
    admin.initializeApp({
      credential: cert({
        projectId: this.configService.get<FirebaseConfig>('firebase').projectId,
        privateKey: this.configService.get('FIREBASE_PRIVATEKEY'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      }),
    });
  }

  private listenForNewUsers() {
    functions.auth.user().onCreate(async (user) => {
      await this.prisma.user.create({
        data: {
          id: user.uid,
          email: user.email,
        },
      });
    });

    functions.auth.user().onDelete(async (user) => {
      await this.prisma.user.delete({
        where: {
          id: user?.uid,
        },
      });
    });
  }

  async verifyToken(token: string) {
    try {
      const tokenData = await admin.auth().verifyIdToken(token);
      return {
        status: true,
        tokenData,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
}
