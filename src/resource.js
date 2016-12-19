
var res = {
    background: "res/images/background.jpg",
    logo: "res/images/logo.png",
    home_desc: "res/images/home-desc.png",
    nijia: "res/images/ninja.png",
    new_game: "res/images/new-game.png",
    quit: "res/images/quit.png",
    dojo: "res/images/dojo.png",
    newTag: "res/images/new.png",
    home_mask: "res/images/home-mask.png",
    flash: "res/images/flash.png",
    smoke: "res/images/smoke.png",
    shadow: "res/images/shadow.png",
    knife: "res/images/knife.png",
    game_over: "res/images/game-over.png"
    };
var g_resources = [];
var fruits = {
    peach: "res/images/fruit/peach.png",
    peach_1: "res/images/fruit/peach-1.png",
    peach_2: "res/images/fruit/peach-2.png",
    sandia: "res/images/fruit/sandia.png",
    sandia_1: "res/images/fruit/sandia-1.png",
    sandia_2: "res/images/fruit/sandia-2.png",
    boom: "res/images/fruit/boom.png",
    apple: "res/images/fruit/apple.png",
    apple_1: "res/images/fruit/apple-1.png",
    apple_2: "res/images/fruit/apple-2.png",
    banana: "res/images/fruit/banana.png",
    banana_1: "res/images/fruit/banana-1.png",
    banana_2: "res/images/fruit/banana-2.png",
    basaha: "res/images/fruit/basaha.png",
    basaha_1: "res/images/fruit/basaha-1.png",
    basaha_2: "res/images/fruit/basaha-2.png",
}

var plists = {
    parplist: "res/images/particle_texture.plist",
    particle: "res/images/particle_texture.png",
    par_cir: "res/images/cir.png",
    par_cir_plist: "res/images/cir.plist"
}

var ui_res = {
    lose: "res/images/lose.png",
    score: "res/images/score.png",
    xf: "res/images/xf.png",
    xxf: "res/images/xxf.png",
    xxxf: "res/images/xxxf.png",
    x: "res/images/x.png",
    xx: "res/images/xx.png",
    xxx: "res/images/xxx.png"
}

var sounds = {
    boom: "res/sound/boom.mp3",
    menu: "res/sound/menu.mp3",
    over: "res/sound/over.mp3",
    splatter: "res/sound/splatter.mp3",
    start: "res/sound/start.mp3",
    throwd: "res/sound/throw.mp3"
}
for (var i in res) {
    g_resources.push(res[i]);
}

for(var j in fruits) {
    g_resources.push(fruits[j]);
}

for(var k in plists) {
    g_resources.push(plists[k]);
}

for (var key in ui_res) {
    g_resources.push(ui_res[key]);
};
//sounds resources
for(var s in sounds) {
    g_resources.push(sounds[s]);
}
