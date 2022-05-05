import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/app.module';
import USER_QUERY from './query.gql';
import USER_MUTATION from './mutation.gql';
import { print } from 'graphql';
import { mocks } from '~/mocks';
import { User } from '~/models/user';
import { Response } from '~/types/api';
import { Auth } from '~/auth/auth.model';

describe('1. User (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  const [getUser] = USER_QUERY.definitions;
  const [createUser, deleteUser] = USER_MUTATION.definitions;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    req = request(app.getHttpServer());
  });

  afterAll(() => app.close());

  it('should create a user at first', async () => {
    const operation: string = createUser['operation'];
    const res: Response<{ createUser: Auth }> = await req
      .post('/graphql')
      .send({ query: `${operation} ${print(createUser)}` });
    expect(res.body.data.createUser.user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should find a user by id', async () => {
    const operation: string = getUser['operation'];
    const res: Response<{ getUser: User }> = await req.post('/graphql').send({
      query: `${operation} ${print(getUser)}`,
    });
    expect(res.body.data.getUser).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should delete a user by id', async () => {
    const operation: string = deleteUser['operation'];
    const res: Response<{ deleteUser: User }> = await req.post('/graphql').send({
      query: `${operation} ${print(deleteUser)}`,
    });
    expect(res.body.data.deleteUser).toStrictEqual(expect.objectContaining(mocks.user.user));
  });
});
