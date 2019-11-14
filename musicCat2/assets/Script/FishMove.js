cc.Class({
    extends: cc.Component,

    properties: {
        speed = 3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.node.y -= this.speed;
    },
});
