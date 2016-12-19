//OverLayer...

var OverLayer = cc.Layer.extend({
	ctor: function(scene) {
		this._super();

		this.scene = scene;
		var over = new cc.Sprite("res/images/game-over.png");
		over.x = cc.winSize.width / 2;
		over.y = cc.winSize.height / 2;
		this.addChild(over);
		this.init();
		return true;
	},

	init: function() {
		//注册鼠标事件监听器
		if('mouse' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: this._onMouseDown.bind(this)
			}, this);
		};
	},

	_init: function() {
		this.init();
	},

	_onMouseDown: function(event) {
		this.scene.removeChild(this, true);
		this.scene._init();
	}
})