const mineflayer = require('mineflayer');
const blockFinderPlugin = require('mineflayer-blockfinder')(mineflayer);
const navigatePlugin = require('mineflayer-navigate')(mineflayer);

const jump = require('./modules/jump.js');
const craft = require('./modules/craft.js');

const attackPlayer = require('./modules/attackPlayer.js');
const getWood = require('./modules/getWood.js');
let jumpstate = false;

const master = "OlleThunberg";
let bot = mineflayer.createBot({
//   host: "localhost", // optional
//   port: 55158,       // optional
//   username: "email@example.com", // email and password are required only for
//   password: "12345678",          // online-mode=true servers
});

navigatePlugin(bot);

bot.loadPlugin(blockFinderPlugin);
bot.navigate.blocksToAvoid[132] = true; // avoid tripwire
bot.navigate.blocksToAvoid[59] = false; // ok to trample crops


console.log("Bot running...");
let taskIndex = 0;
let taskList = ["jump", "dig"];
bot.on('whisper', function(username, message) {
  if (username === master){
      if(message === "!togglejump"){
        jump(bot, !jumpstate);
        jumpstate = !jumpstate;
      }
      if(message === "!attackPlayer"){
        attackPlayer(bot);
      }
      if(message === "!getWood"){
        getWood.find(bot);
      }
      if(message === "!buildWorkBench"){
        craft.workbench(bot);
      }
  }
});

bot.navigate.on('cannotFind', function (closestPath) {
  bot.navigate.walk(closestPath, (stopReason) => {
      getWood.dig(bot);
  });
});

