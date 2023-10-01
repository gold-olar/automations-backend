import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionPlan } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { successResponse } from 'src/common/utils/response';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return successResponse('Found user!', user);
  }

  async applyAccessCode(userId: string, accessCode: string) {
    const existingAccessCode = await this.prisma.accessCode.findFirst({
      where: {
        value: accessCode,
      },
    });
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!existingAccessCode) {
      throw new NotFoundException('Invalid code');
    }
    if (existingAccessCode.active) {
      throw new BadRequestException('Access code is already in use');
    }

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const activateAccessCode = this.prisma.accessCode.update({
      where: {
        id: existingAccessCode?.id,
      },
      data: {
        active: true,
      },
    });

    const updateUser = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        plan: existingAccessCode.plan,
      },
    });

    const [_, updatedUser] = await this.prisma.$transaction([
      activateAccessCode,
      updateUser,
    ]);

    return successResponse('Applied Code!', updatedUser);
  }

  async createNewUser(userId: string, email: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists!');
    }
    const user = await this.prisma.user.create({
      data: {
        id: userId,
        email: email,
        plan: SubscriptionPlan.FREE,
      },
    });

    return successResponse('User Created!', user);
  }
}
