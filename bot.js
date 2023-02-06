import express from "express";
import dotenv from "dotenv";
import { ChatGPTAPI } from "chatgpt";
import { Bot } from "grammy";
import { startCommand } from "./commands.js";
import { chatWithChatGPT } from "./chatgpt.js";
import { Menu } from "@grammyjs/menu";

// Env variables
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const API_KEY = process.env.OPENAI_API_KEY || "";
const port = process.env.PORT || 3000;

// Global variables
let isChatting = false;
const message = "Hello! What would you like to do?";

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

// Chat menu
const chatMenu = new Menu("chat-menu")
  .text("Start chatting", async (ctx) => {
    isChatting = true;
    console.log(`${isChatting ? "Continuing to chat" : "Starting chat"}`);
    ctx.reply("How can I help you today?");
  })
  .text("Stop chatting", async (ctx) => {
    isChatting = false;
    console.log("Ending chat");
    ctx.reply("Goodbye! I will see you again in 3.0!");
  });

bot.use(chatMenu);

// Start command
bot.command("start", (ctx) => {
  startCommand(ctx);
  isChatting = true;
});

// Help command
bot.command("help", (ctx) => {
  ctx.reply(message, { reply_markup: chatMenu });
});

// Menu command
bot.command("menu", (ctx) => {
  ctx.reply(message, { reply_markup: chatMenu });
});

// Stop command
bot.command("stop", (ctx) => {
  isChatting = false;
});

// User message
bot.on("message", async (ctx) => {
  if (isChatting) await chatWithChatGPT(ctx);
});

// Launch bot
bot.start();

export { ChatGPT, bot };
