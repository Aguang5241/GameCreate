cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {

    },

    update (dt) {
        this.node.x = this.player.x;
        this.node.y = this.player.y;
    },
});
