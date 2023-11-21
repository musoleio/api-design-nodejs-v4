import app from '../../server';
import * as user from '../user';
import supertest from 'supertest';

describe('user handler', () => {
  describe('#createUser', () => {

    //   it('should create a new user in the db', async () => {
    //     const req = { body: { username: 'lewis', password: 'snow' } }
    //     const res = {
    //       json(params: { token: string }) {
    //         console.log(params.token);
    //         expect(params.token).toBeTruthy();
    //       }
    //     }
    //     await user.createUser(req, res, () => { })
    //   })
    // });

    it('POST /user should sign up new user', async () => {
      const response = await supertest(app)
        .post('/user')
        .send({ username: 'Lubosi', password: 'smokesmoke' })
        .set('Accept', 'application/json');

      expect(response.body.errors).toBeUndefined();
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    });

  })

})