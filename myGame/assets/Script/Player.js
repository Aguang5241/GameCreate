cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    onTouchStart: function (event) {
        if (event.getLocationX() > this.node.parent.width / 2) {
            this.rightDirection = true;

        } else {
            this.leftDirection = true;
        }
    },

    onTouchEnd: function (event) {
        if (event.getLocationX() > this.node.parent.width / 2) {
            this.rightDirection = false;

        } else {
            this.leftDirection = false;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var player = this.node;
        player.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        player.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.rightDirection = false;
        this.leftDirection = false;
        this.deltaX = 0;
    },

    start() {

    },

    update(dt) {
        if (this.rightDirection) {
            this.deltaX += this.speed;
        };
        if (this.leftDirection) {
            this.deltaX -= this.speed;
        };
        if (this.deltaX > this.node.parent.width / 2 - 10 - this.node.width / 2) {
            this.deltaX = this.node.parent.width / 2 - 10 - this.node.width / 2
        };
        if (this.deltaX < -this.node.parent.width / 2 + 10 + this.node.width / 2) {
            this.deltaX = -this.node.parent.width / 2 + 10 + this.node.width / 2
        };
        this.node.x = this.deltaX;
    },
});
