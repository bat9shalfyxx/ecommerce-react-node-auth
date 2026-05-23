import "dotenv/config";
import express from "express";
import sequelize from "./config/database.js";

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`
\x1b[36m\x1b[1mServer Status:\x1b[0m
\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
\x1b[32m\x1b[1m✅ Status:\x1b[0m     \x1b[37mOnline\x1b[0m
\x1b[33m\x1b[1m🔌 Port:\x1b[0m       \x1b[36m${PORT}\x1b[0m
\x1b[33m\x1b[1m🌐 URL:\x1b[0m        \x1b[36mhttp://localhost:${PORT}\x1b[0m
\x1b[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m
    `);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
