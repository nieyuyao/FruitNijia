//碰撞检测
var Collision = {
	checkCollision: function(x1, y1, x2, y2, xc, yc, r) {
		/**
		* @ param x1, y1, x2, y2, 分别为线段的两个端点
		* @ param xc, yc, 为圆心坐标
		* @ return true 表示发生碰撞,反之则没有发生碰撞
		*/
		var mid = this.getDistance(x1, y1, x2, y2, xc, yc);
		if(mid <= r) {
			return true;
		}
		return false;

	},

	getDistance: function(x1, y1, x2, y2, xc, yc) {
		var d1 = Math.sqrt((xc - x1) * (xc - x1) + (yc - y1) * (yc - y1));
		var d2 = Math.sqrt((xc - x2) * (xc - x2) + (yc - y2) * (yc - y2));
		var d = this.getAngle(x1, y1, x2, y2, xc, yc) * d1;
		return Math.min.call(this, d1, d2, d);
	},

	getAngle: function(x1, y1, x2, y2, xc, yc) {
		var v1_x = x2 - x1;
		var v1_y = y2 - y1;
		var v2_x = xc - x1;
		var v2_y = yc - y1;
		var dot = v1_x * v2_x + v1_y * v2_y;
		if(dot < 0) {
			return 1000;
		}
		var mod = Math.sqrt(v1_x * v1_x + v1_y * v1_y) * Math.sqrt(v2_x * v2_x + v2_y * v2_y);
		//返回正弦值
		return Math.sqrt(1 - dot * dot / mod / mod);
	},

	//得到刀刃的角度
	getKnifeRota: function(x1, y1, x2, y2, id, rota) {	
		if((x2 - x1) == 0) {
			var atan = 90;
		}
		else {
			var tan = (y2 - y1) / (x2 - x1);
			var atan = Math.atan(tan) / Math.PI * 180;
		}	
		if(atan >= 0) {
			return 90 - atan - Constant.FRUITS[id].rota;
		}
		else {
			return -(Constant.FRUITS[id].rota + 90 + atan);
		}
	}
}