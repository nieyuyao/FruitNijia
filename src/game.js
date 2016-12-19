//Game...

/*随机生成器*/
var Randomer = {
	count: 0,
	getCount: function(max) {
		this.count = 1 + Math.floor((Math.random() * max));

	},
	getTypes: function(max) {
		this.getCount(max);
		var types = [];
		//根据count返回count个随机数（1-6)
		for (var i = 0; i < this.count; i++) {
			types.push(Math.floor(Math.random() * Constant.COUNT));
		};
		return types;
	}
};

/*发射器*/
var Emitter = function(game) {
	this.game = game;
}
Emitter.prototype = {
	//取出types里面的数字，初始化为对应的水果
	addFruits: function(types) {
		var fruits = [];
		for (var i = 0; i < types.length; i++) {
			if(!this.game.cachePool.length) {
				var fruit = Fruit.creat();
			}
			else {
				var fruit = this.game.cachePool.shift();
			}
			var url = Constant.FRUITS[types[i]].url;
			fruit.setId(types[i]);
			fruit.setTexture(url);
			fruit.setR(Constant.FRUITS[types[i]].r);
			//设置水果的随机位置，随机速度
			fruit.setPosition(40 + (Math.random() * cc.winSize.width - 40), 0);
		    //根据生成的位置，生成随机速度
		    var vx = cc.winSize.width / 2 - fruit.x;
		    var vy = 480 + Math.random() * 120;
			fruit.setVec(vx , vy);			
			if(types[i] == 5) {
				this.setBoom(fruit);
			}
			else {
				fruit.setVr(60 + Math.random() * 120);
			}			
			//把水果加入飞行器中
			this.game.flyPool.push(fruit);
			this.game.addChild(fruit);
		};
		Sound.playThrow();
	},

	setBoom: function(boom) {
		boom.setSend();
	}
}

/*游戏页面*/
/**
@param score 表示当前用户的得分
@param isFalse 表示游戏是否失败
@param levelIndex 表示当前关卡
@param t 用于循环调用发射器
@method checkCollision()  检查刀刃有没有切中抛出的水果
@method doHit() 切中后水果执行的方法
*/
var GameLayer = cc.Layer.extend({
	isFalse: false,
	score: 0,
	levelIndex: 1,
	t: 0,
	knife: null,
	isDown: false,
	prex: 0,
	prey: 0,
	nohit: 0, //account of fruit that is not hited 
	isFailed: false,              
	ctor: function(ui, scene) {
		this._super();
		this.level = Constant.LEVELS[this.levelIndex - 1]; //当前关卡
		this.emitter = new Emitter(this); //发射器
		this.cachePool = []; //缓存器
		this.flyPool = []; //飞行器
		this.hites = []; //已经被切中的水果的缓存器
		this.partsFly = []; //切中水果的飞行器
		this.ui = ui; //ui
		this.loser = new cc.Sprite('res/images/lose.png'); //如果丢失一个水果，出现一次
		THIS = this;
		this.knife = new Knife(0.3, 3, 10, cc.color(50, 220, 255), "res/images/knife.png", this); //刀刃
		this.addChild(this.knife);
		this.scene = scene; // GameScene

		//初始化
		this.init();
	},
	_onTouchBegan: function(touch, event) {
		this.isDown = true;
		this.prex = event.getLocationX();
		this.prey = event.getLocationY();
		this.knife.setPosition(event.getLocation());
		this.knife.setParticleInitalPositon(event.getLocationX(), event.getLocationY());
		console.log("*****")
		return true;
	},

	_onTouchMoved: function(touch, event) {
		if(this.isDown) {

			this.knife.setPosition(event.getLocation());
			this.knife.setParticlePosition(event.getLocationX(), event.getLocationY());
			var dis = Math.sqrt((event.getLocationX() - this.prex) * (event.getLocationX() - this.prex)
				+ (event.getLocationY() - this.prey) * (event.getLocationY() - this.prey));
			if(dis >= 30) {
				this.checkCollision(event.getLocationX(), event.getLocationY(), this.prex, this.prey);
				this.prex = event.getLocationX();
				this.prey = event.getLocationY();
			}
		}
	},

	_onTouchEnded: function(touch, event) {
		this.isDown = false;
		this.knife.reset(); //清空所有片段
		this.knife.setStartingPositionInitialized(false); //将初始位置改为还未设定
	},

	_onTouchCancelled: function(touch, event) {

	},

	init: function() {
		//注册鼠标事件监听器
		if('mouse' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: function(event) {
					THIS.isDown = true;
					THIS.prex = event.getLocationX();
					THIS.prey = event.getLocationY();
					THIS.knife.setPosition(event.getLocation());
					THIS.knife.setParticleInitalPositon(event.getLocationX(), event.getLocationY());
				},
				onMouseMove: function(event) {
					if(THIS.isDown) {
						THIS.knife.setPosition(event.getLocation());
						THIS.knife.setParticlePosition(event.getLocationX(), event.getLocationY());
						var dis = Math.sqrt((event.getLocationX() - THIS.prex) * (event.getLocationX() - THIS.prex)
							+ (event.getLocationY() - THIS.prey) * (event.getLocationY() - THIS.prey));
						if(dis >= 30) {
							THIS.checkCollision(event.getLocationX(), event.getLocationY(), THIS.prex, THIS.prey);
							THIS.prex = event.getLocationX();
							THIS.prey = event.getLocationY();
						}
					}
				},
				onMouseUp: function(event) {
					THIS.isDown = false;
					THIS.knife.reset(); //清空所有片段
					THIS.knife.setStartingPositionInitialized(false); //将初始位置改为还未设定
				}
			}, this);
		}
		//touch
		else if("touches" in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan: this._onTouchBegan.bind(this),
				onTouchMoved: this._onTouchMoved.bind(this),
				onTouchEnded: this._onTouchEnded.bind(this),
				onTouchCancelled: this._onTouchCancelled.bind(this)
			}, this);
		}
		//初始化缓存器，存入20个水果
		this.initCachePool();
		this.initHites();
		this.scheduleUpdate();
	},

	initCachePool: function() {
		for (var i = 0; i < 20; i++) {
			var fruit = new Fruit();
			this.cachePool.push(fruit);
		};
	},
	//初始化存储已切中的水果的队列
	initHites: function() {
		//初始化20个切中的水果
		for (var i = 0; i < 20; i++) {
			this.hites.push(Fruit.creat());
		};
	},
	//检查刀刃是否切中水果
	checkCollision: function(x1, y1, x2, y2) {
		/*
		循环遍历当前飞行器中水果的位置，判断是否和刀刃碰撞
		如果碰撞那么将此水果移除至缓存器中
		*/
		if(!this.flyPool.length) {
			return;
		}
		for (var i = this.flyPool.length - 1; i >= 0; i--) {
			if(Collision.checkCollision(x1, y1, x2, y2, this.flyPool[i].x, this.flyPool[i].y, this.flyPool[i].radius)) {
				var del = this.flyPool.splice(i, 1)[0];
				this.doHit(del, Collision.getKnifeRota(x1, y1, x2, y2, del.id, del.rotation));
			}
		};
	},
	//切中水果
	doHit: function(fruit, angle) {
		Sound.playSplatter();
		this.score++;
		this.setScore(this.score);
		this.updateLevel(this.score);
		if(!fruit) {
			return;
		}
		this.removeChild(fruit);
		fruit.clear();
		this.cachePool.push(fruit);
		//得到两部分切开的水果,加入切中水果飞行器
		if(!this.hites.length) {
			var part1 = Fruit.creat();
			var part2 = Fruit.creat();
		}
		else{
			var part1 = this.hites.shift();
			var part2 = this.hites.shift();
		}
		part1.setTexture(Constant.FRUITS[fruit.id].part1);
		part2.setTexture(Constant.FRUITS[fruit.id].part2);
		//设置part1，part2的位置和速度，旋转角度
		var pos = fruit.getPos();
		part1.setPosition(pos.x, pos.y);
		part1.setVec(-100, 0);
		part1.setVr(30);
		part1.setRota(angle)
		part2.setPosition(pos.x, pos.y);
		part2.setVec(100, 0);
		part2.setVr(30);
		part2.setRota(angle);
		//part1， part2加入partsFly中
		this.partsFly.push(part1);
		this.partsFly.push(part2);
		this.addChild(part1);
		this.addChild(part2);
	},
	//UI Score...
	setScore: function(score) {
		this.ui.setScore(score);
	},
	//update Level
	updateLevel: function(score) {
		if(score >= this.level.score) {
			this.levelIndex++;
			this.level = Constant.LEVELS[this.levelIndex];
		}
	},
	//update()...
	update: function(dt) {
		if(this.t >= this.level.minTime || !this.t % this.level.minTime) {
			var types = Randomer.getTypes(this.level.maxNum);
			//将发射器的返回的水果加入飞行器中
			this.emitter.addFruits(types);
			this.t %= this.level.minTime;
		}
		this.t += dt;		
		//遍历flyPool中的水果
		for (var i = 0; i < this.flyPool.length; i++) {
			this.flyPool[i].update(dt);
		};
		//遍历飞行器中的水果，是否应该被删除
		for (var i = this.flyPool.length - 1; i >= 0; i--) {
			if(this.flyPool[i].x < -this.flyPool[i].radius / 2 || 
				this.flyPool[i].x > this.flyPool[i].radius / 2 + cc.winSize.width || 
				this.flyPool[i].y < -this.flyPool[i].radius / 2){
				//从飞行器中删除,添加至缓存器
				this.removeChild(this.flyPool[i]);
				this.flyPool[i].clear();
				if(this.flyPool[i].id != 5) {
			    	this.nohit++;
			    	this.ui.setLose(this.nohit);
			    	if(this.nohit == 3) {
			    		this.isFailed = true;
			    		this.over(this.isFailed);
			    	}
			    }
			    this.cachePool.push(this.flyPool.splice(i, 1)[0]);	    
			}

		};
		//遍历切中水果飞行器中的水果
		if(!this.partsFly.length) {
			return;
		}
		for (var i = 0; i < this.partsFly.length; i++) {
			this.partsFly[i].update(dt);
		};
		//遍历切中水果飞行器的水果，判断是否应该添加至切中水果缓存器
		for (var i = this.partsFly.length - 1; i >= 0; i--) {
			if (this.partsFly[i].x < -this.partsFly[i].width / 2 || 
				this.partsFly[i].x > cc.winSize.width + this.partsFly[i].width / 2 ||
				this.partsFly[i].y < -this.partsFly[i].width / 2 ) {
				this.removeChild(this.partsFly[i]);
				this.hites.push(this.partsFly.splice(i, 1)[0]);
			};
		};
	},
	_init: function() {
		console.log("game........")
		this.isFalse = false,
	   	this.score = 0,
	   	this.levelIndex = 1,
	   	this.t = 0,
	   	this.knife = null,
	   	this.isDown = false,
	   	this.prex = 0,
	   	this.prey = 0,
	   	this.nohit = 0, //account of fruit that is not hited 
	   	this.isFailed = false,
	   	this.emitter = new Emitter(this); //发射器
		this.level = Constant.LEVELS[this.levelIndex - 1]; //当前关卡重置为 1
		this.cachePool = []; //清空缓存器
		this.flyPool = []; //清空飞行器
		this.hites = []; //清空已经被切中的水果的缓存器
		this.partsFly = []; //清空切中水果的飞行器
		this.knife = new Knife(0.3, 3, 10, cc.color(50, 220, 255), "res/images/knife.png", this); //刀刃
		this.addChild(this.knife);
		this.init();
	},
	over: function(isFailed) {
		if(!isFailed) {
			return;
		}
		//stop update
		this.unscheduleUpdate();
		this.removeAllChildren(true);
		Sound.playOver();
		this._init();
		this.ui._init();
		this.scene.removeChild(this, true);
		this.scene.removeChild(this.ui, true);
		if(!this.scene.overLayer) {
			this.scene.overLayer = new OverLayer(this.scene);
		}
		else {
			this.scene.overLayer._init();
		}
		this.scene.addChild(this.scene.overLayer, 2);
	}
});
