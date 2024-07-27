const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const { beforeAll, expect, it } = require('@jest/globals');
require('dotenv').config({ path: '../config/config.env' });

const mockFn = jest.fn();
jest.mock('../models/userModel');
jest.mock('../models/cartModel');

describe('TEST ON API -> /api/users', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'TEST';
        process.env.JWT_EXPIRES_IN = 60;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/users/signup', () => {
        it('should return success if user being signed up correctly', async () => {
            req = {
                name: 'TWOBAO',
                email: 'TWOBAO@example.com',
                password: '123456',
                passwordConfirm: '123456',
            };
            User.create.mockResolvedValue({ _id: '1' });
            Cart.create.mockResolvedValue({ userId: '1' });

            const response = await request(app)
                .post('/api/users/signup')
                .send(req);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.user).toEqual({ _id: '1' });
        });

        it('should return fail if user already exist', async () => {
            User.find.mockResolvedValue(true);

            const response = await request(app).post('/api/users/signup');
            expect(response.text).toBe('User already exist!');
        });
    });

    describe('POST /api/users/login', () => {
        it('should return fail if user not provide email and password', async () => {
            const req = {
                email: 'TEST@example.com',
            };

            const response = await request(app)
                .post('/api/users/login')
                .send(req);

            expect(response.status).toBe(200);
            expect(response.text).toBe('Please provide email and password!');
        });

        it('should return fail if user provide wrong password', async () => {
            const req = { email: 'TEST@example.com', password: 'test123' };
            User.findOne.mockResolvedValue(req);
            User.findOne.mockResolvedValue({
                correctPassword: jest.fn().mockReturnValue(false),
            });

            const response = await request(app)
                .post('/api/users/login')
                .send(req);

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                status: 'fail',
                message: 'Invalid password',
            });
        });

        it('should return success if user login correctly', async () => {
            const req = { email: 'TEST@example.com', password: 'test123' };
            User.findOne.mockResolvedValue(req);
            User.findOne.mockResolvedValue({
                correctPassword: jest.fn().mockReturnValue(true),
            });

            const response = await request(app)
                .post('/api/users/login')
                .send(req);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });
    });

    describe('GET /api/users/logout', () => {
        it('should return success if user logout correctly', async () => {
            const response = await request(app).get('/api/users/logout');
            expect(response.status).toBe(200);
            expect(response.headers['set-cookie'][0]).toMatch(/jwt=loggedout/);
            expect(response.text).toBe('Logout successfully!');
        });
    });
});
