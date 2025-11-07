// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "NextApp-Production", // Tên hiển thị của ứng dụng
      script: "npm",              // Sử dụng npm hoặc yarn
      args: "start",              // Lệnh chạy next start
      exec_mode: "cluster",       // BẬT chế độ Cluster (tận dụng đa nhân CPU)
      instances: "max",           // Số lượng tiến trình (nên đặt là "max" để dùng hết lõi CPU)
      env: {
        NODE_ENV: "production",
        PORT: 3000,               // Port chạy ứng dụng Next.js
        // Thêm các biến môi trường khác của bạn tại đây
      },
      watch: false,               // Không cần watch trong môi trường production
      max_memory_restart: "400M", // Tự động khởi động lại nếu bộ nhớ vượt quá ngưỡng
      error_file: "logs/app-err.log", // File ghi lỗi
      out_file: "logs/app-out.log",   // File ghi output
      merge_logs: true,               // Gộp logs từ các instance
    },
  ],
};