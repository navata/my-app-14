// ecosystem.config.js
module.exports = {
  apps: [{
    name: "nextjs-app", // Tên ứng dụng của bạn trong PM2
    script: "npm",       // Chạy lệnh npm
    args: "start",       // Với đối số "start" (tương đương npm run start)
    env: {
      NODE_ENV: "production",
      PORT: 3000, // Cổng mà Next.js sẽ lắng nghe
    },
    env_production: { // Cấu hình dành riêng cho môi trường production (nếu muốn)
      NODE_ENV: "production",
      PORT: 3000,
    },
    // exec_mode: "cluster", // Chế độ cluster để tận dụng đa lõi CPU (recommended)
    // instances: "max",     // Số lượng instance = số lõi CPU tối đa
    // wait_ready: true, // Nếu ứng dụng cần thời gian để khởi động hoàn toàn
    listen_timeout: 50000, // Thời gian chờ cho listen
    kill_timeout: 5000,    // Thời gian chờ để kill process
    // max_memory_restart: '200M', // Khởi động lại nếu vượt quá bộ nhớ
    error_file: "logs/error.log", // File ghi lỗi
    out_file: "logs/output.log", // File ghi log stdout
    log_date_format: "YYYY-MM-DD HH:mm:ss", // Định dạng ngày giờ trong log
    // Tùy chọn nâng cao
    watch: false,                   // Không watch trong môi trường production
    max_memory_restart: '300M',     // Tự khởi động lại nếu tiến trình vượt quá 300MB RAM
  }]
};