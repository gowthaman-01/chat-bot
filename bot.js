import express from "express";
import dotenv from "dotenv";
import { ChatGPTAPI } from "chatgpt";
import { Bot } from "grammy";
import { startCommand } from "./commands.js";
import { chatWithChatGPT } from "./chatgpt.js";

// Env variables
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const API_KEY = process.env.OPENAI_API_KEY || "";
const port = process.env.PORT || 3000;

// Express
const expressApp = express();
expressApp.get("/", (req, res) => {
  res.send("Bot Launched");
});
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Telegram bot
const bot = new Bot(BOT_TOKEN);

// ChatGPT
const ChatGPT = new ChatGPTAPI({
  apiKey: API_KEY,
});

// Start command
bot.command("start", (ctx) => {
  startCommand(ctx);
});

// User message
bot.on("message", async (ctx) => {
  await chatWithChatGPT(ctx);
});

// Launch bot
bot.start();

export { ChatGPT, bot };
