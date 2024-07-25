const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');

jest.mock('../models/productModel');

describe('Product API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 409 if product name already exists', async () => {
        Product.find.mockResolvedValue([{ name: 'Existing Product' }]);

        const response = await request(app)
            .post('/api/products')
            .send([{ name: 'Existing Product' }]);

        expect(response.status).toBe(409);
        expect(response.body).toEqual({
            status: 'fail',
            message: 'Product name Existing Product already exists.',
        });
    });

    it('should create a new product and return 201', async () => {
        Product.find.mockResolvedValue([]);
        Product.create.mockResolvedValue([{ name: 'New Product' }]);

        const response = await request(app)
            .post('/api/products')
            .send([{ name: 'New Product' }]);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            status: 'success',
            data: {
                products: [{ name: 'New Product' }],
            },
        });
    });

    it('should return 400 if product data is invalid', async () => {
        Product.find.mockResolvedValue([]);
        Product.create.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/products')
            .send([{ name: 'Invalid Product' }]);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 'fail',
            message: 'Invalid product data.',
        });
    });
});
