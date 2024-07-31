# CT-store

CT-store is an e-commerce backend system based on Node.js, Express, MongoDB, etc. This project provides a RESTful API for managing products, users, carts, and reviews.
You can clone this repo for your e-commerce backend system.

[![繁體中文](https://img.shields.io/badge/繁體中文-Readme-blue)](README_zh-TW.md)
[![简体中文](https://img.shields.io/badge/简体中文-Readme-blue)](README_zh-CN.md)

## Directory Structure

-   `app.js`: Main application file
-   `routes/`: Contains route files for different resources
-   `Controller/`: Contains controller files for handling requests
-   `models/`: Contains model files for database schemas
-   `views/`: Contains view templates
-   `swagger.js`: Swagger setup for API documentation
-   `__test__/`: Contains test files
-   `config/`: Contains .env, config setup

## Features

-   **Product Management**: Create, read, update, and delete products.
-   **User Management**: Manage user accounts and authentication.
-   **Cart Management**: Add, update, and remove items from the cart.
-   **Review Management**: Add and manage product reviews.
-   **API Documentation**: Swagger-based API documentation.
-   **Error Handling**: Comprehensive error handling for API requests.
-   **Testing**: Unit, integration and stress tests for API endpoints.

## Tech Stack

-   **Node.js**: JavaScript runtime for building server-side applications.
-   **Express**: Web framework for Node.js.
-   **MongoDB**: NoSQL database for storing application data.
-   **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
-   **pm2**: Simple implementation on cluster.
-   **Swagger**: API documentation tool.
-   **Jest**: Testing framework for JavaScript.
-   **Apache Jmeter**: Load test on API.
-   **Supertest**: Library for testing Node.js HTTP servers.
-   **Morgan**: HTTP request logger middleware for Node.js.
-   **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
-   **Http-errors**: Library for creating HTTP errors.
-   **Cookie-parser**: Middleware for parsing cookies.

## Guide

### Prerequisites

-   Node.js (v12 or higher)
-   MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env` file **in the config directory** and add the following:

    ```env
    JWT_SECRET = Set JWT SECRET KEY for jwt authorization
    JWT_EXPIRES_IN = 2h

    PORT=3000
    DATABASE=Your mongodb database link
    ```

4. **Start the application:**

    ```bash
    npm start
    npm start:prod # with pm2 load balancing
    ```

5. **Access the API documentation:**
   Open your browser and navigate to `http://localhost:3000/api-docs` to view the Swagger API documentation.

## PM2 Load Balancing

This section provides an alternative version of the application backend that includes a load balancing module. This module helps to increase the capability of handling a large number of requests efficiently.

### Using PM2 for Load Balancing

1. **Install PM2:**

    ```bash
    npm install pm2 -g
    ```

2. **Configure the ecosystem.config.js file:**

    Create an `ecosystem.config.js` file in the root directory of your project and add the following content:

    ```javascript
    module.exports = {
        apps: [
            {
                name: 'app',
                script: './app.js',
                instances: 'max',
                exec_mode: 'cluster',
                autorestart: true,
                watch: true,
                max_memory_restart: '2G',
                env: {
                    NODE_ENV: 'development',
                    PORT: 3000,
                },
                env_production: {
                    NODE_ENV: 'production',
                },
            },
        ],
    };
    ```

3. **Start the application:**

    ```bash
    pm2 start ecosystem.config.js
    ```

4. **Check the application status:**

    ```bash
    pm2 status
    ```

5. **Check system logs simultaneouly**

    ```bash
    pm2 logs
    ```

By following these steps, you can use PM2 to distribute your application across multiple CPU cores, achieving load balancing and improving the performance and stability of your application.

## Contribution

We welcome contributions to the CT Store project! If you have any ideas, suggestions, or bug reports, please feel free to open an issue or submit a pull request. Here are the steps to contribute:

1. **Fork the repository:**

    Click the "Fork" button at the top right corner of this repository page.

2. **Clone your forked repository:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

3. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes:**

    Implement your feature or fix the bug in your branch.

5. **Commit your changes:**

    ```bash
    git add .
    git commit -m "Add your commit message here"
    ```

6. **Push to your forked repository:**

    ```bash
    git push origin feature/your-feature-name
    ```

7. **Create a pull request:**

    Go to the original repository and click the "New Pull Request" button. Provide a clear description of your changes and submit the pull request.

## Contact

If you have any questions or need further assistance, please feel free to contact us:

-   **Email**: abfa762466@gmail.com

Appreciate your feedback and support!
