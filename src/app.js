var GameScene = cc.Scene.extend({
	bgLayer: null,
	welcome: null,
	gameLayer: null,
	ui: null,
	overLayer: null,
	onEnter: function() {
		this._super();
		this.bgLayer = new BgLayer();
		
		this.welcome = new WelcomLayer(this);
		
		this.addChild(this.bgLayer, 1);
		this.addChild(this.welcome, 2);
		
	},

	_init: function() {
		this.removeChild(this.welcome, true);
		this.welcome._init();
		this.addChild(this.welcome, 2);
	}
});

