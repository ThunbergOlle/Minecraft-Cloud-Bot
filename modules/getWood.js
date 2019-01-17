let blocksToDig;
module.exports.find = (bot) => {

    bot.findBlock({
        point: bot.entity.position,
        matching: 17,
        maxDistance: 256,
        count: 4,
      }, function(err, blocks) {
        if (err) {
          console.log("Err finding wood: " + err);
          return;
        }
        if (blocks.length) {
            console.log("Found wood!");
            blocksToDig = blocks;
            bot.navigate.to(blocks[0].position);
          return;
        } else {
          console.log("Did not find any wood...");
          return;
        }
    });
}
module.exports.dig = (bot) => {
    console.log("Chopping some wood!");
    let max = blocksToDig.length;
    let i = 0;

    bot.dig(blocksToDig[i], onDiggingComplete);
    function onDiggingComplete (err) {
        if (err) {
          return;
        }
        if(i < max){
            i++;
            if(blocksToDig[i] !== undefined){
                bot.dig(blocksToDig[i], onDiggingComplete);
            }else return;
        } else return;
    }
    return;
}