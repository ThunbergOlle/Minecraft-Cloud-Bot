module.exports.workbench = (bot) => {
    let minResultCount;
    let recipe = bot.recipesFor(58, null, minResultCount, null);
    if(recipe.length !== 0){
        recipe = recipe[0];
        bot.craft(recipe, 1, null, () => {
            console.log("Built: Workbench");
        });
    }else {
        console.log("Not enough resources to build: Workbench");
    }

}