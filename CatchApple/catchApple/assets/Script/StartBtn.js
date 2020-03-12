cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onTouchStar: function(event) {
        cc.director.loadScene('Scene1')
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var btn = this.node;
        btn.on(cc.Node.EventType.TOUCH_START, this.onTouchStar, this)
    },

    start () {

    },

    // update (dt) {},
});
