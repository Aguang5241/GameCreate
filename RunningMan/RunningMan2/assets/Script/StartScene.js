cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            default: null,
            type: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.audioEngine.stopAll();
        cc.audioEngine.playMusic(this.bgm, true)
    },

    start () {

    },

    // update (dt) {},
});
