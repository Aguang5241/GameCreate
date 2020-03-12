cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var act = cc.sequence(cc.jumpBy(1, 500, 0, 50, 5), cc.jumpBy(1, -500, 0, 50, 5));
        this.node.runAction(cc.repeatForever(act))
    },

    // update (dt) {},
});
