// ecosystem.config.js
module.exports = {
    apps: [
        {
            name: 'app1',
            script: './app1.js',
            instances: 1,
            autorestart: true,
            watch: true,
            mode: 'cluster',
            max_memory_restart: '1G',
            env: {
                PORT: 3000,
                NODE_ENV: 'development', // 確保在開發環境中設置
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'app2',
            script: './app2.js',
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                PORT: 3001,
                NODE_ENV: 'development', // 確保在開發環境中設置
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
