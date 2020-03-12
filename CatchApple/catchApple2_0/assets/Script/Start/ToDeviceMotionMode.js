cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onTouchEnd: function(event) {
        cc.director.loadScene('SceneD1')
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var btn = this.node;
        btn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    },

    start () {

    },

    // update (dt) {},
});
