cc.Class({
    extends: cc.Component,

    properties: {
        chooseBg: {
            default: null,
            type: cc.Node
        }
    },

    onTouchEnd: function(event) {
        // cc.director.loadScene('Scene1')
        this.anim.play();
    },  

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.chooseBg.getComponent(cc.Animation);
        var btn = this.node;
        btn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
    },

    start () {

    },

    // update (dt) {},
});
