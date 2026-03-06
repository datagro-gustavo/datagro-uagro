module.exports = {
  apps: [
    {
      name: "uagro",
      cwd: "/var/www/html/datagro-uagro",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_NEWS_API: "https://api.uagro.com.br/"
      }
    }
  ]
}
