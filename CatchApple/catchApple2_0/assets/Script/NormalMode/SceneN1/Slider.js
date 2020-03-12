cc.Class({
    extends: cc.Component,

    properties: {
        slider: {
            default: null,
            type: cc.Slider
        }
    },

    // onTouchStart: function() {},
    // onTouchMove: function() {},

    onTouchEnd: function () {
        if (this.slider.progress != 0.5) {
            this.slider.progress = 0.5;
        }
    },

    onTouchCancel: function () {
        if (this.slider.progress != 0.5) {
            this.slider.progress = 0.5;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // 针对滚动小控件
        this.node.getChildByName('Handle').on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.getChildByName('Handle').on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        // 针对滚动条
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    start() {

    },

    // update (dt) {},
});
