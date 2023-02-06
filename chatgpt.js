import { ChatGPT } from "./bot.js";

const chatWithChatGPT = async (ctx) => {
  console.log("Chatting with ChatGPT");
  console.log(`Input text: ${ctx.message.text}`);
  const reply = await ChatGPT.sendMessage(ctx.message.text);
  console.log(`Reply from ChatGPT: ${reply.text}`);
  ctx.reply(reply.text);
};

export { chatWithChatGPT };
