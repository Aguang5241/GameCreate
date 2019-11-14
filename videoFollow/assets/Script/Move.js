cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    update (dt) {
        this.node.x += this.speed;
    },
});
