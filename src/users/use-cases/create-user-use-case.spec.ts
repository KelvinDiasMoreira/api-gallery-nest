import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { DatabaseModule } from '../../database/database.module';
import { PrismaService } from '../../database/prisma.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../../auth/auth.module';


describe('Module of Prisma', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AuthModule]
    }).compile();

    jwtService = module.get(JwtService)
    prisma = module.get(PrismaService);
    app = module.createNestApplication();
    await app.init();
  });
  it('prisma should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  describe('get users with token', () => {
    it('should return code 200', async () => {
      let payload = { name: 'example', email: 'example@hotmail.com' }
      let token = jwtService.sign(payload);
      return  await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`).expect(200)
    })
  })

  describe('get users without token', () => {
    it('should return code 401', async () => {
      return  await request(app.getHttpServer()).get('/users').expect(401)
    })
  })

});

