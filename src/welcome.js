//Nijia
var Nijia = cc.Sprite.extend({
	ctor: function(url) {
		this._super(url);
		this.x = (cc.winSize.width + this.width) / 2 - 50;
		this.y = cc.winSize.height + this.width / 2; //初始时位置
		this.y0 = cc.winSize.height - 70; //最后应该停留的位置
		this.a = (cc.winSize.height + this.width / 2) - this.y0; //幅度
		this.a0 = this.a;
		this.v = this.a;
		this.t = 0;
		this.scheduleUpdate();
	},
	update: function() {
		if(this.a <= 0) {
			return;
		}
		this.y = this.a * Math.abs(Math.cos(2 * Math.PI * this.t)) + this.y0;
		this.t += 16 / 1000;
		this.a = this.a0 - this.v * this.t;
	}
})

//New
var NewTag = cc.Sprite.extend({
	ctor: function(url) {
		this._super(url);

		this.x = 200;
		this.y = 250;
		this.y0 = 250;
		this.t = 0;
		this.a = 10;
		this.scheduleUpdate();
	},

	update: function() {
		this.y = this.y0 + this.a * Math.sin(this.t / 180 * Math.PI);
		this.t = (this.t + 6) % 360;
	}
})


//欢迎页面
var WelcomLayer = cc.Layer.extend({
	isDown: false,
	sandia_x: 0,
	sandia_y: 0,
	prex: 0,
	prey: 0,
	fly: [],
	ctor: function(scene) {
		this._super();
		this.init();
		this.scene = scene;
	},
	//初始化页面
	init: function() {
		this.size = cc.winSize;
		
		Sound.playMenu();
		this.logoSprite = new cc.Sprite(res.logo);
		this.homeDescSprite = new cc.Sprite(res.home_desc);
		this.homeMaskSprite = new cc.Sprite(res.home_mask);
		this.dojoSprite = new cc.Sprite(res.dojo);
		this.newGameSprite = new cc.Sprite(res.new_game);
		this.quitSprite = new cc.Sprite(res.quit);
		this.peach = Fruit.creat();
		this.peach.setTexture("res/images/fruit/peach.png");
		this.sandia = Fruit.creat();
		this.sandia.setTexture("res/images/fruit/sandia.png");
		this.boom = Fruit.creat();
		this.boom.setTexture("res/images/fruit/boom.png");
		this.smoke = new cc.Sprite(res.smoke);
		

		//设置logo在homemask中的位置
		this.homeMaskSprite.addChild(this.logoSprite, 1);
		this.logoSprite.x = 120;
		this.logoSprite.y = 120;
		//为homemask添加动画
		this.homeMaskSprite.x = this.homeMaskSprite.width / 2;
		this.homeMaskSprite.y = this.size.height + this.homeMaskSprite.height / 2;
		var homemask_move = cc.moveTo(1, this.homeMaskSprite.width / 2, this.size.height - this.homeMaskSprite.height / 2);
		this.homeMaskSprite.runAction(homemask_move.easing(cc.easeOut(1)));
		this.addChild(this.homeMaskSprite);

		//为nijia添加动画
		this.nijiaSprite = new Nijia("res/images/ninja.png");
		this.addChild(this.nijiaSprite);

		//new标签
		this.tag = new NewTag("res/images/new.png");
		this.addChild(this.tag, 2);

		//为homeDescSprite添加位置
		this.homeDescSprite.x = this.homeDescSprite.width / 2 + 30;
		this.homeDescSprite.y = this.size.height - 180;
		this.addChild(this.homeDescSprite);

		//为dojoSprite添加位置
		
		this.dojoSprite.x = this.dojoSprite.width / 2 + 50;
		this.dojoSprite.y = this.dojoSprite.height / 2 + 80;
		this.dojoSprite.runAction(cc.rotateBy(10, -360).repeatForever());
		this.addChild(this.dojoSprite);

		//为peach添加位置
		this.peach.x = this.dojoSprite.x;
		this.peach.y = this.dojoSprite.y;
		this.peach.runAction(cc.rotateBy(5, 360).repeatForever());
		this.addChild(this.peach);

		//为newGame添加位置
		this.sandia.x = this.newGameSprite.width / 2;
		this.sandia.y = this.newGameSprite.height / 2;
		this.sandia.runAction(cc.rotateBy(5, 360).repeatForever());
		this.newGameSprite.addChild(this.sandia);
		this.newGameSprite.x = this.dojoSprite.x + this.dojoSprite.width / 2 + 120;
		this.newGameSprite.y = this.dojoSprite.y;
		var newgameAction = cc.rotateBy(10, -360);
		this.newGameSprite.runAction(newgameAction.repeatForever());
		this.addChild(this.newGameSprite);

		this.sandia_x = this.newGameSprite.x;
		this.sandia_y = this.newGameSprite.y;

		//quit添加位置
		this.quitSprite.x = this.newGameSprite.x + this.newGameSprite.width / 2 + 100;
		this.quitSprite.y = this.newGameSprite.y;
		this.quitSprite.runAction(cc.rotateBy(10, -360).repeatForever());
		this.addChild(this.quitSprite);	

		//boom位置
		this.boom.setPosition(this.quitSprite.x, this.quitSprite.y);
		this.boom.setId(5);
		this.boom.setSend();
		this.fly.push(this.boom);
		this.addChild(this.boom);

		//smoke位置
		this.smoke.x = this.boom.x - 30;
		this.smoke.y = this.boom.y + 30;
		this.addChild(this.smoke, 2);

		//this.send = new Send(this, this.boom.x - 28, this.boom.y + 28);
		//this.addChild(this.send);
		this.scheduleUpdate();

		this.knife = new Knife(0.3, 3, 10, cc.color(50, 220, 255), "res/images/knife.png", this);
		this.addChild(this.knife);
		//添加事件
		var THIS = this;
		if('mouse' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: function(event) {
					console.log("*********");
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
						//检查是否切中西瓜
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
		};
		
	},
	_init: function() {
		this.isDown = false,
	    this.sandia_ =  0,
		this.sandia_y = 0,
		this.prex = 0,
		this.prey = 0,
		this.fly = [];
		this.knife = new Knife(0.3, 3, 10, cc.color(50, 220, 255), "res/images/knife.png", this);
		this.addChild(this.knife);
		cc.eventManager.removeListener(this);
		this.init();
	},
	//检查刀刃是否切中水果
	checkCollision: function(x1, y1, x2, y2) {
		/*
		检查刀刃是否切中西瓜
		*/
		if(Collision.checkCollision(x1, y1, x2, y2, this.newGameSprite.x, this.newGameSprite.y, Constant.FRUITS[4].r)) {
			this.doHit(Collision.getKnifeRota(x1, y1, x2, y2, 4, this.sandia.rotation));
		}
	},
	//remove()...
	remove: function() {
		this.removeChild(this.newGameSprite, true);
		this.removeChild(this.logoSprite, true);
		this.removeChild(this.homeDescSprite, true);
		this.removeChild(this.homeMaskSprite, true);
		this.removeChild(this.dojoSprite, true);
		this.removeChild(this.quitSprite, true);
		this.removeChild(this.smoke, true);
		this.removeChild(this.nijiaSprite, true);
		this.removeChild(this.sandia, true);
		this.removeChild(this.tag, true);
		this.removeChild(this.knife, true);
	},
	//切中水果
	doHit: function(angle) {
		Sound.stopMenu();
		Sound.playSplatter();
		
		this.remove();
		this.peach.stopAllActions();
		//得到两部分切开的水果,加入切中水果飞行器
		if(!this.part1) {
			this.part1 = Fruit.creat();
			this.part2 = Fruit.creat();
			this.part1.setTexture(Constant.FRUITS[4].part1);
			this.part2.setTexture(Constant.FRUITS[4].part2);
			//设置part1，part2的位置和速度，旋转角度
			this.part1.setPosition(this.sandia_x, this.sandia_y);
			this.part1.setVec(-100, 0);
			this.part1.setRota(angle)
			this.part2.setPosition(this.sandia_x, this.sandia_y);
			this.part2.setVec(100, 0);
			this.part2.setRota(angle);
			//part1， part2加入partsFly中
			this.fly.push(this.part1);
			this.fly.push(this.part2);
			this.addChild(this.part1);
			this.addChild(this.part2);
		}	
		//设置其他水果
		this.peach.setVec(-100, 0);
		this.peach.setRota(0);
		this.boom.setVec(100, 0);
		this.boom.setRota(0);
		this.fly.push(this.peach);
		this.fly.push(this.boom);
	},

	//checkOver()...
	checkOver: function() {
		for (var i = 0; i < this.fly.length; i++) {
			if(this.fly[i].y >= -40) {
				return false;
			}
		};
		this.part1 = null;
		this.part2 = null;
		this.startGame();
	},

	//startGame()...
	startGame: function() {

		this.scheduleUpdate();
		this.boom.clear();
		this.removeAllChildren(true);
		this.scene.removeChild(this, true);
		if(!this.scene.ui) {
			this.scene.ui = new GameUI();
		    this.scene.gameLayer = new GameLayer(this.scene.ui, this.scene);
		}	
		else {
			this.scene.gameLayer._init();
			this.scene.ui._init();
		}
		this.scene.addChild(this.scene.ui, 3);
		this.scene.addChild(this.scene.gameLayer, 2);
	},

	//update()...
	update: function(dt) {
		if(this.fly.length <= 1) {
			this.fly[0].update(0);
			return;
		}
		//遍历fly
		for (var i = 0; i < this.fly.length; i++) {
			this.fly[i].update(dt);
		};
		this.checkOver();
	}
})