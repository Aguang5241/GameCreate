cc.Class({
    extends: cc.Component,

    properties: {
        height: 0,
        time: 0,
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    playAudio: function () {
        cc.audioEngine.playEffect(this.jumpAudio, false)
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var act = cc.sequence(
            cc.spawn(
                cc.moveBy(this.time, cc.v2(0, this.height)),
                cc.scaleBy(this.time, 0.95, 1.05),
            ).easing(cc.easeCubicActionOut()),
            cc.spawn(
                cc.moveBy(this.time, cc.v2(0, -this.height)),
                cc.scaleBy(this.time, 1.05, 0.95),
            ).easing(cc.easeCubicActionIn()),
            cc.callFunc(this.playAudio, this)
        );
        this.node.runAction(cc.repeatForever(act))
    },

    // update (dt) {},
});
