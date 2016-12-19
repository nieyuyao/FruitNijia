/**
@param vx 表示x方向的速度
@param vy 表示y方向的速度
@param radius 表示水果的半径
**/
var Fruit = cc.Sprite.extend({
	vx: 0,
	vy: 0,
	radius: 0,
	vr: 0,
	id: 0,
	flashes: [],
	send: null,
	ctor: function() {
		this._super();
		this.rotation = 0;
	},
	clear: function() {
		this.vr = 0;
		this.flashes = [];
		if(this.send) {
			this.send.stopSend();
			this.removeAllChildren(true);
		}		
	},
	setR: function(r) {
		this.radius = r;
	},
	setVec: function(vx, vy) {
		this.vx = vx;
		this.vy = vy;
	},
	setVr: function(vr) {
		this.vr = vr;
	},
	setPosition: function(x, y) {
		this.x = x;
		this.y = y;
	},
	setId: function(typeId) {
		this.id = typeId;
	},
	getPos: function() {
		return {
			x: this.x,
			y: this.y
		};
	},
	setRota: function(rota) {
		this.rotation = rota;
	},
	setSend: function() {
		this.send = new Send(this, 10, 62);
		this.addChild(this.send);
	},
	update: function(dt) {	
		this.rotation = this.rotation + this.vr * dt;
		this.x = this.x + this.vx * dt;
		this.y = this.y + this.vy * dt - 1 / 2 * Constant.G * dt * dt;
		this.vy = this.vy - dt * Constant.G;
		if(this.id == 5) {
			this.update2();
		}
	},
	update2: function() {
		//检查需要删除的flash
		for (var i = this.flashes.length - 1; i >=0 ; i--) {
			if(this.flashes[i].s <= 0.01) {
				this.removeChild(this.flashes[i]);
				this.flashes.splice(i, 1);
			}
		};

		for (var i = 0; i < this.flashes.length; i++) {
			this.flashes[i].update();
		};
	}
});
//创建一个新的水果
Fruit.creat = function() {
	return new Fruit();
}