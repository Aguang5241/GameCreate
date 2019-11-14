cc.Class({
    extends: cc.Component,

    properties: {
        cat: {
            default: null,
            type: cc.Node
        },
        music: {
            default: null,
            type: cc.AudioClip
        },
    },

    // 触摸操作
    onTouchMove: function (event) {
        this.cat.x = event.getLocationX() - this.node.width / 2;
        if (this.cat.x < -this.node.width / 2 + this.cat.width / 2) {
            this.cat.x = -this.node.width / 2 + this.cat.width / 2;
        };
        if (this.cat.x > this.node.width / 2 - this.cat.width / 2) {
            this.cat.x = this.node.width / 2 - this.cat.width / 2
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.audioEngine.playMusic(this.music, false);
    },

    start() {

    },

    update(dt) {

    },
});
