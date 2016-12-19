//Sound Manager
var Sound = {
	throw_effect: null,
	splatter_effect: null,
	menu_effect: null,
	//切中炸弹
	playBoom: function() {
		cc.audioEngine.playEffect("res/sound/boom.mp3", false);
	},

	//扔出水果
	playThrow: function() {
		//如果有一个音效在播放，那么不播放
		if(this.throw_effect) {
			cc.audioEngine.stopEffect(this.throw_effect);
		}
		this.throw_effect = cc.audioEngine.playEffect("res/sound/throw.mp3", false);
	},

	//切中水果
	playSplatter: function() {
		//如果有一个切水果的音效在播放，那么不播放
		if(this.splatter_effect) {
			cc.audioEngine.stopEffect(this.splatter_effect);
		}
		this.splatter_effect = cc.audioEngine.playEffect("res/sound/splatter.mp3", false);
	},

	//Game over
	playOver: function() {
		cc.audioEngine.playEffect("res/sound/over.mp3");
	},

	//menu
	playMenu: function() {
		this.menu_effect = cc.audioEngine.playMusic("res/sound/menu.mp3", true);
	},
	
	//stop menu
	stopMenu: function() {
		cc.audioEngine.stopMusic(true);
	},

	//start
	playStart: function() {
		cc.audioEngine.playEffect("res/sound/start.mp3");
	}
}