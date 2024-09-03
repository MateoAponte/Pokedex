import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaConnectionService
  extends PrismaClient
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }

  parsedTextBD(text: string) {
    const textParsed = text.replace(/\n/g, '');
    return textParsed;
  }
}
