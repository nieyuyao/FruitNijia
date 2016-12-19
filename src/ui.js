//UI页面
/*
*/
var GameUI = cc.Layer.extend({
	score: 0, //表示当前分数
	lose: 0, //表示当前漏掉的水果数目
	ctor: function() {
		this._super();
		this.init();
	},

	init: function() {
		var scoreSprite = new cc.Sprite("res/images/score.png");
		scoreSprite.x = scoreSprite.width / 2;
		scoreSprite.y = cc.winSize.height - scoreSprite.height / 2 - 10;
		this.addChild(scoreSprite);

		this.scoreLabel = new cc.LabelTTF("0", "Microsoft Yahei", 30);
		this.scoreLabel.x = scoreSprite.width + 20 + this.scoreLabel.width / 2;
		this.scoreLabel.y = scoreSprite.y - 2;
		this.scoreLabel.color = cc.color(223, 105, 14);
		this.addChild(this.scoreLabel);

		this.losxxx = new cc.Sprite("res/images/xxx.png");
		this.losxxx.x = cc.winSize.width - this.losxxx.width / 2 - 20;
		this.losxxx.y = cc.winSize.height - this.losxxx.height / 2;
		this.addChild(this.losxxx);

		this.losxx = new cc.Sprite("res/images/xx.png");
		this.losxx.x = this.losxxx.x - this.losxxx.width / 2 - this.losxx.width / 2 - 10;
		this.losxx.y = cc.winSize.height - this.losxx.height / 2;
		this.addChild(this.losxx);

		this.losx = new cc.Sprite("res/images/x.png");
		this.losx.x = this.losxx.x - this.losxx.width / 2 - this.losx.width / 2 - 10;
		this.losx.y = cc.winSize.height - this.losx.height / 2;
		this.addChild(this.losx); 
		
		
	},

	setScore: function(score) {
		this.score = score;
		this.scoreLabel.setString(this.score);
		
	},

	getScore: function() {
		return this.score;
	},

	setLose: function(index) {
		if(index == 1) {
			this.losx.setTexture("res/images/xf.png");
		}
		else if(index == 2) {
			this.losxx.setTexture("res/images/xxf.png");
		}
		else if(index == 3) {
			this.losxxx.setTexture("res/images/xxxf.png");
		}
		else {
			return;
		}
	},

	_init: function() {
		this.setScore(0);
		this.lose = 0;
		this.losx.setTexture("res/images/x.png");
		this.losxx.setTexture("res/images/xx.png");
		this.losxxx.setTexture("res/images/xxx.png");
	}
})