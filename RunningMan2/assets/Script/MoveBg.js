cc.Class({
    extends: cc.Component,

    properties: {
        speed: 5,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if (this.main.dashEnable) {
            this.node.runAction(cc.moveBy(1, cc.v2(-300, 0)));
            this.main.dashEnable = false;
        } else {
            this.node.x -= this.speed;
        };
        if (this.player.stopBg) {
            this.speed = 0;
        }
    },
});
