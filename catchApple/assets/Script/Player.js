cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    onTouchStart: function (event) {
        // var pos = event.getLocationX() - this.node.parent.width / 2;
        // if (pos < Math.abs(this.node.parent.width / 2 - 10)) {
        //     this.node.x = pos;
        // }
        var pos = event.getLocationX() - this.node.parent.width / 2;
        if ((pos < this.node.parent.width / 2 - 10 - this.node.width / 2) && (pos > -(this.node.parent.width / 2 - 10 - this.node.width / 2))) {
            this.node.x = pos;
        }
    },

    onTouchMove: function (event) {
        // var pos = event.getLocationX() - this.node.parent.width / 2;
        // if (pos < Math.abs(this.node.parent.width / 2 - 10)) {
        //     this.node.x = pos;
        // }
        var pos = event.getLocationX() - this.node.parent.width / 2;
        if ((pos < this.node.parent.width / 2 - 10 - this.node.width / 2) && (pos > -(this.node.parent.width / 2 - 10 - this.node.width / 2))) {
            this.node.x = pos;
        }
    },

    onTouchEnd: function (event) {
        // var pos = event.getLocationX() - this.node.parent.width / 2;
        // if (pos < Math.abs(this.node.parent.width / 2 - 10)) {
        //     this.node.x = pos;
        // }
        var pos = event.getLocationX() - this.node.parent.width / 2;
        if ((pos < this.node.parent.width / 2 - 10 - this.node.width / 2) && (pos > -(this.node.parent.width / 2 - 10 - this.node.width / 2))) {
            this.node.x = pos;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var player = this.node;
        player.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        player.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        player.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        // this.rightDirection = false;
        // this.leftDirection = false;
        this.deltaX = 0;
    },

    start() {

    },

    update(dt) {
        // if (this.rightDirection) {
        //     this.deltaX += this.speed;
        // };
        // if (this.leftDirection) {
        //     this.deltaX -= this.speed;
        // };
        // if (this.deltaX > this.node.parent.width / 2 - 10 - this.node.width / 2) {
        //     this.deltaX = this.node.parent.width / 2 - 10 - this.node.width / 2
        // };
        // if (this.deltaX < -this.node.parent.width / 2 + 10 + this.node.width / 2) {
        //     this.deltaX = -this.node.parent.width / 2 + 10 + this.node.width / 2
        // };
        // this.node.x = this.deltaX;
    },
});
