# CT-store

CT-store 是一個基於 Node.js、Express、MongoDB 等技術的電子商務後端系統。此專案提供管理產品、用戶、購物車和評論的 RESTful API。
你可以克隆這個倉庫來建立你的電子商務後端系統。

## 目錄結構

-   `app.js`: 主應用程式文件
-   `routes/`: 包含不同資源的路由文件
-   `Controller/`: 包含處理請求的控制器文件
-   `models/`: 包含資料庫模式的模型文件
-   `views/`: 包含視圖模板
-   `swagger.js`: 用於 API 文件的 Swagger 設置
-   `__test__/`: 包含測試文件
-   `config/`: 包含 .env 和配置設置

## 功能

-   **產品管理**: 創建、讀取、更新和刪除產品。
-   **用戶管理**: 管理用戶帳戶和身份驗證。
-   **購物車管理**: 添加、更新和移除購物車中的項目。
-   **評論管理**: 添加和管理產品評論。
-   **API 文件**: 基於 Swagger 的 API 文件。
-   **錯誤處理**: 全面的 API 請求錯誤處理。
-   **測試**: API 端點的單元測試和整合測試。

## 技術棧

-   **Node.js**: 用於構建伺服器端應用的 JavaScript 運行時。
-   **Express**: Node.js 的 Web 框架。
-   **MongoDB**: 用於存儲應用數據的 NoSQL 資料庫。
-   **Mongoose**: 用於 MongoDB 和 Node.js 的 ODM（對象數據建模）庫。
-   **pm2**: 簡單的集群實現。
-   **Swagger**: API 文件工具。
-   **Jest**: JavaScript 測試框架。
-   **Supertest**: 用於測試 Node.js HTTP 伺服器的庫。
-   **Morgan**: 用於 Node.js 的 HTTP 請求日誌中介軟體。
-   **Cors**: 用於啟用跨來源資源共享的中介軟體。
-   **Http-errors**: 用於創建 HTTP 錯誤的庫。
-   **Cookie-parser**: 用於解析 Cookie 的中介軟體。

## 指南

### 先決條件

-   Node.js (v12 或更高版本)
-   MongoDB

### 安裝

1. **克隆倉庫:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

2. **安裝依賴:**

    ```bash
    npm install
    ```

3. **設置環境變量:**
   在 config 目錄中創建一個 `.env` 文件，並添加以下內容:

    ```env
    JWT_SECRET = 設置 JWT 授權的密鑰
    JWT_EXPIRES_IN = 2h

    PORT=3000
    DATABASE=你的 MongoDB 資料庫連結
    ```

4. **啟動應用:**

    ```bash
    npm start
    npm start:prod # 使用 pm2 負載均衡
    ```

5. **訪問 API 文件:**
   打開瀏覽器並導航到 `http://localhost:3000/api-docs` 查看 Swagger API 文件。

## PM2 負載均衡

本節提供了一個包含負載均衡模塊的應用後端替代版本。此模塊有助於提高處理大量請求的能力。

### 使用 PM2 進行負載均衡

1. **安裝 PM2:**

    ```bash
    npm install pm2 -g
    ```

2. **配置 ecosystem.config.js 文件:**

    在專案根目錄中創建一個 `ecosystem.config.js` 文件，並添加以下內容:

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

3. **啟動應用:**

    ```bash
    pm2 start ecosystem.config.js
    ```

4. **檢查應用狀態:**

    ```bash
    pm2 status
    ```

5. **同時檢查系統日誌**

    ```bash
    pm2 logs
    ```

通過這些步驟，你可以使用 PM2 將應用分佈到多個 CPU 核心上，實現負載均衡，並提高應用的性能和穩定性。

## 貢獻

我們歡迎對 CT Store 專案的貢獻！如果你有任何想法、建議或錯誤報告，請隨時打開問題或提交拉取請求。以下是貢獻的步驟:

1. **Fork 倉庫:**

    點擊本倉庫頁面右上角的 "Fork" 按鈕。

2. **克隆你 Fork 的倉庫:**

    ```bash
    git clone https://github.com/your-username/CT-store.git
    cd CT-store
    ```

3. **創建新分支:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **進行修改:**

    在你的分支中實現功能或修復錯誤。

5. **提交修改:**

    ```bash
    git add .
    git commit -m "添加你的提交信息"
    ```

6. **推送到你 Fork 的倉庫:**

    ```bash
    git push origin feature/your-feature-name
    ```

7. **創建拉取請求:**

    前往原始倉庫並點擊 "New Pull Request" 按鈕。提供清晰的修改描述並提交拉取請求。

## 聯繫

如果你有任何問題或需要進一步的幫助，請隨時聯繫我們:

-   **Email**: abfa762466@gmail.com

感謝你的反饋和支持！
