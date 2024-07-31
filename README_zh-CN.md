# CT-store

CT-store 是一个基于 Node.js、Express、MongoDB 等技术的电子商务后端系统。此项目提供管理产品、用户、购物车和评论的 RESTful API。
你可以克隆这个仓库来建立你的电子商务后端系统。

## 目录结构

-   `app.js`: 主应用程序文件
-   `routes/`: 包含不同资源的路由文件
-   `Controller/`: 包含处理请求的控制器文件
-   `models/`: 包含数据库模式的模型文件
-   `views/`: 包含视图模板
-   `swagger.js`: 用于 API 文档的 Swagger 设置
-   `__test__/`: 包含测试文件
-   `config/`: 包含 .env 和配置设置

## 功能

-   **产品管理**: 创建、读取、更新和删除产品。
-   **用户管理**: 管理用户账户和身份验证。
-   **购物车管理**: 添加、更新和移除购物车中的项目。
-   **评论管理**: 添加和管理产品评论。
-   **API 文档**: 基于 Swagger 的 API 文档。
-   **错误处理**: 全面的 API 请求错误处理。
-   **测试**: API 端点的单元测试和集成测试。

## 技术栈

-   **Node.js**: 用于构建服务器端应用的 JavaScript 运行时。
-   **Express**: Node.js 的 Web 框架。
-   **MongoDB**: 用于存储应用数据的 NoSQL 数据库。
-   **Mongoose**: 用于 MongoDB 和 Node.js 的 ODM（对象数据建模）库。
-   **pm2**: 简单的集群实现。
-   **Swagger**: API 文档工具。
-   **Jest**: JavaScript 测试框架。
-   **Supertest**: 用于测试 Node.js HTTP 服务器的库。
-   **Morgan**: 用于 Node.js 的 HTTP 请求日志中间件。
-   **Cors**: 用于启用跨来源资源共享的中间件。
-   **Http-errors**: 用于创建 HTTP 错误的库。
-   **Cookie-parser**: 用于解析 Cookie 的中间件。

## 指南

### 先决条件

-   Node.js (v12 或更高版本)
-   MongoDB

### 安装

1. **克隆仓库:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

2. **安装依赖项:**

    ```bash
    npm install
    ```

3. **设置环境变量:**
   在 `config` 目录中创建一个 `.env` 文件，并添加以下内容：

    ```env
    JWT_SECRET = 设置 JWT 密钥用于 jwt 验证
    JWT_EXPIRES_IN = 2h

    PORT=3000
    DATABASE=你的 MongoDB 数据库链接
    ```

4. **启动应用:**

    ```bash
    npm start
    npm start:prod # 使用 pm2 负载均衡
    ```

5. **访问 API 文档:**
   打开你的浏览器，导航到 `http://localhost:3000/api-docs` 查看 Swagger API 文档。

## PM2 负载均衡

本节提供了一个包括负载均衡模块的应用后端的替代版本。这个模块有助于提高处理大量请求的能力。

### 使用 PM2 进行负载均衡

1. **安装 PM2:**

    ```bash
    npm install pm2 -g
    ```

2. **配置 ecosystem.config.js 文件:**

    在项目根目录创建一个 `ecosystem.config.js` 文件，并添加以下内容：

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

3. **启动应用:**

    ```bash
    pm2 start ecosystem.config.js
    ```

4. **检查应用状态:**

    ```bash
    pm2 status
    ```

5. **同时检查系统日志**

    ```bash
    pm2 logs
    ```

通过这些步骤，你可以使用 PM2 将应用分布到多个 CPU 核心上，实现负载均衡，并提高应用的性能和稳定性。

## 贡献

我们欢迎对 CT Store 项目的贡献！如果你有任何想法、建议或错误报告，请随时打开问题或提交拉取请求。以下是贡献的步骤:

1. **Fork 仓库:**

    点击本仓库页面右上角的 "Fork" 按钮。

2. **克隆你 Fork 的仓库:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

3. **创建新分支:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **进行修改:**

    在你的分支中实现功能或修复错误。

5. **提交修改:**

    ```bash
    git add .
    git commit -m "添加你的提交信息"
    ```

6. **推送到你 Fork 的仓库:**

    ```bash
    git push origin feature/your-feature-name
    ```

7. **创建拉取请求:**

    前往原始仓库并点击 "New Pull Request" 按钮。提供清晰的修改描述并提交拉取请求。

## 联系

如果你有任何问题或需要进一步的帮助，请随时联系我们:

-   **Email**: abfa762466@gmail.com

感谢你的反馈和支持！
