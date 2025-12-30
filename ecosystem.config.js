// PM2 Ecosystem Configuration for 2GB RAM Server
module.exports = {
  apps: [
    {
      name: 'bbi-frontend',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1, // Next.js standalone mode, single instance

      env: {
        NODE_ENV: 'development',
      },

      env_production: {
        NODE_ENV: 'production',
      },

      // Memory limit: 800MB for Next.js (leaves 1.2GB for backend + MySQL)
      max_memory_restart: '800M',

      // Logging
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,

      // Auto-restart on failure
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
    },
  ],
};
