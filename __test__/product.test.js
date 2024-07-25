const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');

jest.mock('../models/productModel');

describe('TEST ON API -> /api/products', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/products', () => {
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

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
            Product.find.mockResolvedValue(mockProducts);

            const response = await request(app).get('/api/products');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                results: mockProducts.length,
                data: {
                    products: mockProducts,
                },
            });
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return a product by id', async () => {
            const mockProduct = { name: 'Product 1' };
            Product.findById.mockResolvedValue(mockProduct);

            const response = await request(app).get('/api/products/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                data: {
                    product: mockProduct,
                },
            });
        });

        it('should return nothing if product not found', async () => {
            const mockProductId = 1;
            Product.findById.mockResolvedValue(null);

            const response = await request(app).get(
                `/api/products/${mockProductId}`
            );

            expect(response.status).toBe(200);
            expect(response.text).toEqual(
                `ID: ${mockProductId} not in products`
            );
        });
    });

    describe('PATCH /api/products/:id', () => {});
    describe('DELETE /api/products/:id', () => {});
});
