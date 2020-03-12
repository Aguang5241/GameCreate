cc.Class({
    extends: cc.Component,

    properties: {
        speed: 15,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    update(dt) {
        this.node.x -= this.speed;
        if (this.node.x < -this.node.parent.width / 2 - 100) {
            this.main.recycleBlock(this.node);
        };
    },
});
