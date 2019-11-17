cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onTouchEnd: function(event) {
        cc.director.loadScene('Start')
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    start () {

    },

    // update (dt) {},
});
