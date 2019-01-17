module.exports = (bot) => {
    let targetName = Object.keys(bot.players)[1];
    console.log("Attacking target: " + targetName);
    let targetEntity = bot.players[targetName].entity;
    if(targetEntity !== undefined){
        bot.lookAt(targetEntity.position);
        bot.attack(targetEntity);
        console.log("Attacked!!!");
    }else {
        console.log(targetEntity);
        console.log("TargetEntity is undefined...");
    }
}