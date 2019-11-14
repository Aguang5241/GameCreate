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
        this.node.x = this.player.x + 550
        this.node.y = this.player.y + 235
    },

    start () {

    },

    // update (dt) {},
});
