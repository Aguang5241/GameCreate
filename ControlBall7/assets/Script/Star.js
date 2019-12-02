cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    init: function() {
        this.node.runAction(this.getAction());
    },

    starReadyToBeKilled: function () {
        this.UI.starKilled(this.node);
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

    // onLoad() {},

    start() {

    },

    // update (dt) {},
});
