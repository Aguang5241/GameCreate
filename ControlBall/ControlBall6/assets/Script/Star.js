cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    starReadyToBeKilled: function () {
        this.UI.starKilled(this.node);
        this.node.runAction(this.getAction());
    },

    getAction: function () {
        var randDistance = Math.random() * 800 + 200;
        var action;
        if (Math.random() >= 0.5) {
            action = cc.sequence(
                cc.moveBy(3, cc.v2(randDistance, -randDistance)).easing(cc.easeCubicActionIn()),
                cc.callFunc(this.starReadyToBeKilled, this)
            )
        } else {
            action = cc.sequence(
                cc.moveBy(3, cc.v2(-randDistance, -randDistance)).easing(cc.easeCubicActionIn()),
                cc.callFunc(this.starReadyToBeKilled, this)
            )
        };
        return action;
    },

    onLoad() {
        this.currentPos = cc.v2(0, 0);
        this.node.runAction(this.getAction())
    },

    start() {

    },

    // update (dt) {},
});
