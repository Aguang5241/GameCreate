cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        },
        angleInterval: 10,
    },

    onTouchStart: function () {
        if (this.player.angle > 0) {
            this.player.runAction(cc.rotateTo(0.2, 0));
            this.player.getChildByName('playerBody').runAction(cc.rotateTo(0.2, 0));
        } else if (this.player.angle == 0) {
            this.player.runAction(cc.rotateTo(0.2, this.angleInterval));
            this.player.getChildByName('playerBody').runAction(cc.rotateTo(0.2, -this.angleInterval));
        } else if (this.player.angle < 0) {
            this.player.runAction(cc.rotateTo(0.1, -this.angleInterval));
            this.player.getChildByName('playerBody').runAction(cc.rotateTo(0.1, this.angleInterval));
        };
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    start() {

    },

    // update (dt) {},
});
