//刀刃
var Knife = cc.MotionStreak.extend({
	ctor: function(fade, minSeg, stroke, color, texture, layer) {
		this._super(fade, minSeg, stroke, color, texture);
        this.layer = layer;
	},
    setParticlePosition: function(px, py) {
        if (Math.sqrt((px - this.px0) * (px - this.px0) + (py - this.py0) * (py - this.py0)) > 60) {
            var particle = new cc.ParticleSystem("res/images/particle_texture.plist");
            particle.isAutoRemoveOnFinish(true);
            particle.x = px;
            particle.y = py;
            this.layer.addChild(particle);
            this.px0 = px;
            this.py0 = py;
        };
    },
    setParticleInitalPositon: function(px0, py0) {
        this.px0 = px0;
        this.py0 = py0;
    }
})