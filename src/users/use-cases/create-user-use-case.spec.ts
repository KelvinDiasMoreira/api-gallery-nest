import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { DatabaseModule } from '../../database/database.module';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserUseCase } from './create-user.use-case';
import * as bcrypt from 'bcrypt'
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';


describe('Module of Prisma', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule, DatabaseModule]
    }).compile();

    createUserUseCase = module.get(CreateUserUseCase);
    prisma = module.get(PrismaService);
    app = module.createNestApplication();
    await app.init();
  });
  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  describe('get users', () => {
    it('should return an user', async () => {
      return (await request(app.getHttpServer()).get('/users').expect(200))
    })
  })

});

