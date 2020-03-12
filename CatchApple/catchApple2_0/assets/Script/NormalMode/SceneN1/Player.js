cc.Class({
    extends: cc.Component,

    properties: {
        slideDir: {
            default: null,
            type: cc.Slider
        },
        speedValue: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.moveRight = false;
        this.noMove = true;
        this.speed = this.speedValue;
    },

    start() {

    },

    update(dt) {
        // 判断移动与否及移动方向
        if (this.slideDir.progress >= 0.6) {
            this.noMove = false;
            this.moveRight = true;
        } else if (this.slideDir.progress <= 0.4) {
            this.noMove = false;
            this.moveRight = false;
        } else {
            this.noMove = true;
        };
        // 进行移动
        if (this.noMove) { // 静止态
            this.speed = 0
        } else if ((!this.noMove) && (this.moveRight)) { // 向右移动
            this.speed = this.speedValue
        } else if ((!this.noMove) && (!this.moveRight)) { // 向左移动
            this.speed = -this.speedValue
        };
        this.node.x += this.speed;
        // 边缘判断
        if (this.node.x > this.node.parent.width / 2 - this.node.width / 2) {
            this.node.x = this.node.parent.width / 2 - this.node.width / 2
        };
        if (this.node.x < -this.node.parent.width / 2 + this.node.width / 2) {
            this.node.x = -this.node.parent.width / 2 + this.node.width / 2
        };
    },
});
