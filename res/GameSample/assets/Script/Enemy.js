cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.registerTouchEvent();
    },

    registerTouchEvent: function () {
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    },

    touchStart: function (event) {
        this.node.runAction(cc.moveBy(0.2, cc.v2(0, this.game.enemyInstance)));
        if (this.node.y > 300) {
            this.game.onEnemyKilled(this.node);
        }
    },

    start() {
    },

    // update (dt) {},
});
