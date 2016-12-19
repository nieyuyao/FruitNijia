//Flash
var Flash = cc.Sprite.extend({
	ctor: function(url, x, y) {
		this._super(url);
		this.x = x;
		this.y = y;
		this.x0 = x;
		this.y0 = y;
		this.t = 0;
		this.v = 10 + 10 * Math.random();
		this.i = 20 + Math.random() * 2;
		this.init();
	},
	init: function() {
		//初始化大小
		this.setScale(0.05, 0.2);
		//初始化方向
		this.setRotation(-Math.random() * 360);
		this.n = {
			x: Math.cos(-this.rotation / 180 * Math.PI),
			y: Math.sin(-this.rotation / 180 * Math.PI)
		};                                                                                                                                            
	},
	update: function() {
		this.t += 16 / 1000;
		this.s = 0.15 / 3 - this.t * this.t * 0.05 * this.i / 3;
		if(this.s <= 0.01) {
			return;
		}	
		this.setScaleX(this.s);
		this.x = this.x0 + this.n.x * this.v * this.t * 5;
		this.y = this.y0 + this.n.y * this.v * this.t * 5;
	}
});

//Send
var Send = cc.Sprite.extend({
	ctor: function(wel, x, y) {
		this._super();
		this.sendX = x;
		this.sendY = y;
		this.wel = wel;
		this.schedule(this.sendFlash, 0.05);
	},
	//向外发射火花
	sendFlash: function() {
		var flash = new Flash("res/images/flash.png", this.sendX, this.sendY);
		this.wel.flashes.push(flash);
		this.wel.addChild(flash);
	},
	stopSend: function() {
		this.unschedule();
	}
	
})