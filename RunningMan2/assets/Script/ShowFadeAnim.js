cc.Class({
    extends: cc.Component,

    properties: {
        showLabel: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onTouchEnd: function(event) {
        this.anim.play();
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        this.anim = this.showLabel.getComponent(cc.Animation)
    },

    start () {

    },

    // update (dt) {},
});
