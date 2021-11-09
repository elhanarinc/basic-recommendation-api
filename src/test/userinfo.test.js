import request from 'supertest';

import startApplication from '../app';

describe('Start Tests', () => {
  let app;
  beforeAll(async () => {
    app = await startApplication();
  });

  describe('Healthcheck', () => {
    it('should get the 200 from healthcheck', async () => {
      const res = await request(app).get('/healthcheck');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ status: 'OK' });
    });
  });

  describe('UserInfo Valid Test 1', () => {
    const validData1 = {
      firstName: 'Arinc Elhan',
      address: 'Ankara',
      children: 'yes',
      childrenNumber: 3,
      occupation: 'Self-employed',
      email: 'elhanarinc@gmail.com',
    };

    const response1 = {
      'Personal Liability': 5,
      'Health Insurance': 340,
      'Household Content': 6.25,
      Currency: 'EU',
    };

    it('should get recommendation', async () => {
      const res = await request(app).post('/recommendations').send(validData1);
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(response1);
    });
  });

  describe('UserInfo Valid Test 2', () => {
    const validData1 = {
      firstName: 'Arinc Elhan',
      address: 'Istanbul',
      children: 'no',
      childrenNumber: 0,
      occupation: 'Employed',
      email: 'elhanarinc@gmail.com',
    };

    const response1 = {
      'Personal Liability': 6,
      'Health Insurance': 300,
      'Household Content': 7.5,
      Currency: 'EU',
    };

    it('should get recommendation', async () => {
      const res = await request(app).post('/recommendations').send(validData1);
      expect(res.status).toEqual(200);
      expect(res.body.data).toEqual(response1);
    });
  });

  describe('UserInfo Invalid Test 1', () => {
    const validData1 = {
      firstName: 'Arinc Elhan',
      address: 'Istanbul',
      children: 'no',
      childrenNumber: 0,
      occupation: 'TestTestTest',
      email: 'elhanarinc@gmail.com',
    };

    const response1 = {
      errors: [
        {
          value: 'TestTestTest',
          msg: 'Occupation can only be `Employed`, `Student` or `Self-employed`',
          param: 'occupation',
          location: 'body',
        },
      ],
    };

    it('should stuck on validation', async () => {
      const res = await request(app).post('/recommendations').send(validData1);
      expect(res.status).toEqual(422);
      expect(res.body).toEqual(response1);
    });
  });

  describe('UserInfo Invalid Test 2', () => {
    const validData1 = {
      firstName: 'Arinc Elhan',
      address: 'Istanbul',
      children: 2,
      childrenNumber: 0,
      occupation: 'Employed',
      email: 'elhanarinc@gmail.com',
    };

    const response1 = {
      errors: [
        {
          value: 2,
          msg: 'Invalid value',
          param: 'children',
          location: 'body',
        },
        {
          value: 2,
          msg: 'Children can only be `yes` or `no`.',
          param: 'children',
          location: 'body',
        },
      ],
    };

    it('should stuck on validation', async () => {
      const res = await request(app).post('/recommendations').send(validData1);
      expect(res.status).toEqual(422);
      expect(res.body).toEqual(response1);
    });
  });
});
