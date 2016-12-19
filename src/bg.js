var BgLayer = cc.Layer.extend({

	ctor: function() {
		this._super();

		var bg = new cc.Sprite(res.background);
		//设置背景的位置
		bg.x = cc.winSize.width / 2;
		bg.y = cc.winSize.height / 2;
		this.addChild(bg);
	}
})