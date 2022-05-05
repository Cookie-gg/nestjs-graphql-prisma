import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '~/app.module';
import AUTH_MUTATION from './mutation.gql';
import USER_MUTATION from '../user/mutation.gql';
import { print } from 'graphql';
import { mocks } from '~/mocks';
import { Response } from '~/types/api';
import { Auth } from '~/auth/auth.model';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let req: request.SuperTest<request.Test>;
  let token: string;
  let refreshToken: string;
  const [login, status, refresh] = AUTH_MUTATION.definitions;
  const [createUser, deleteUser] = USER_MUTATION.definitions;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    req = request(app.getHttpServer());
    await req.post('/graphql').send({ query: `${createUser['operation']} ${print(createUser)}` });
  });

  afterAll(async () => {
    await req.post('/graphql').send({ query: `${deleteUser['operation']} ${print(deleteUser)}` });
    await app.close();
  });

  it('should login by email and password', async () => {
    const operation: string = login['operation'];
    const res: Response<{ login: Auth }> = await req
      .post('/graphql')
      .send({ query: `${operation} ${print(login)}` });
    const { user, ...rest } = res.body.data.login;
    token = rest.token;
    refreshToken = rest.refreshToken;
    Object.values(rest).map((token) => {
      expect(token).not.toBeUndefined();
      expect(token).not.toBeNull();
    });
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should authenticate and update tokens', async () => {
    const operation: string = status['operation'];
    const res: Response<{ status: Auth }> = await req
      .post('/graphql')
      .send({ query: `${operation} ${print(status)}` })
      .set('authorization', `bearer ${token}`);
    const { user, ...rest } = res.body.data.status;
    token = rest.token;
    refreshToken = rest.refreshToken;
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });

  it('should refresh token by refreshToken', async () => {
    const operation: string = refresh['operation'];
    const res: Response<{ refresh: Auth }> = await req
      .post('/graphql')
      .send({
        query: `${operation} ${print(refresh)}`,
      })
      .set('authorization', `bearer ${refreshToken}`);

    const { user, ...rest } = res.body.data.refresh;
    token = rest.token;
    refreshToken = rest.refreshToken;
    expect(user).toStrictEqual(expect.objectContaining(mocks.user.user));
  });
});
