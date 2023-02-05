const startCommand = (ctx) => {
  console.log("Bot started!");
  const welcomeMessage =
    "Hello, I am Chitti! I am robot that can talk like a human. Just type in a message and I will reply you. It may take a moment for me think, so please be patient!";
  ctx.reply(welcomeMessage);
  setTimeout(() => {
    ctx.reply("How can I help you today?");
  }, 3000);
};

export { startCommand };
